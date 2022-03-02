import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Input, Submitbutton } from "../shared";
import { Background, Popup, Window } from "./Modal";
import { useForm } from "react-hook-form";

const READ_ACCOUNT_QUERY = gql`
    query seeAccountTransfer($id:Int!){
        seeAccountTransfer(id:$id){
            id
            cash
            user{
                id
                nickname
                phone
                pay
            }
        }
    }
`;

const DELETE_ACCOUNT = gql`
    mutation deleteAccount($id:Int!){
        deleteAccount(id:$id){
            ok
            error
        }
    }
`;

const CHARGE_PAY =gql`
mutation chargePay($id:Int! $pay:Int!){
        chargePay(id:$id pay:$pay){
            ok
            error
        }
    }
`;


const Absolute = styled.div`
    position: absolute;
    left: ${ props => props.left };
    right: ${ props => props.right };
    top: ${ props => props.top };
    bottom: ${ props => props.bottom };
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${ props => props.padding };
`;

const Bar = styled.div`
    width: 300px;
    border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
    text-align:center;
    padding: 0 20px;
    margin-top: 25px;
    margin-botton: 10px;
    border-radius: 10px;
    background-color:#fafafa;
    border: 1px solid #C4C4C4;
    &::placeholder{
        font-size: 17px;
    }
    width: ${ props => props.width };
    margin-top: ${ props => props.mt };
`;

const AccountModal = (props) => {
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const id = Number(props.value);
    const {data} = useQuery(READ_ACCOUNT_QUERY,{variables:{id}});
    const onCompleted = (data) => {
        const {chargePay:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    };
    const [deleteAccount] = useMutation(DELETE_ACCOUNT);
    const [chargePay,{loading}] = useMutation(CHARGE_PAY,{
        onCompleted
    });
    const onSubmitValid = () => {
        if(loading){
            return;
        }
        const cash = data?.seeAccountTransfer?.cash;
        const uid = data?.seeAccountTransfer?.user?.id;
        const id = data?.seeAccountTransfer?.id;

        chargePay({
            variables:{
                id:Number(uid),
                pay:Number(cash)
            }
        });

        const deleteAccountUpdate = (cache,result) => {
            const {
                data:{
                    deleteAccount:{ok}
                }
            } = result;
            if(ok){
                cache.evict({id:`AccountTransfer:${id}`});
            }
        };
        deleteAccount({
            variables:{id},
            update:deleteAccountUpdate
        })

        props.setModal(false)
    };
    const clearCommentError = () => {
        clearErrors("result");
    }
    return (
        <Background>
            <Window>
                <Popup>
                    <Flex padding="20px">
                        <Absolute right="15px"><div onClick={()=>props.setModal(false)}>❌</div></Absolute>
                        <Bar mt='20px' width='260px'>ID: {data?.seeAccountTransfer?.id}</Bar>
                        <Bar mt='20px' width='260px'>닉네임: {data?.seeAccountTransfer?.user?.nickname}</Bar>
                        <Bar mt='20px' width='260px'>전화번호: {data?.seeAccountTransfer?.user?.phone}</Bar>
                        <Bar mt='20px' width='260px'>기존 포인트: {data?.seeAccountTransfer?.user?.pay}</Bar>
                        <Bar mt='20px' width='260px'>추가 포인트: {data?.seeAccountTransfer?.cash}</Bar>
                        <form onSubmit={handleSubmit(onSubmitValid)}>
                            <Submitbutton type="submit" value={ loading ? "Loading..." : "포인트 추가"} disabled={!formState.isValid|| loading}  ml='70px' mt='20px' height='15px' />
                        </form>
                        
                    </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default AccountModal;
