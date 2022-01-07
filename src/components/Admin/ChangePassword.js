import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react"
import styled from "styled-components";
import { useUser } from "../../hooks/useUser";
import FormBox from "../auth/FormBox";
import FormError from "../auth/FormError";
import { Input, SearchSubmitbutton } from "../shared";

const Bar = styled.div`
    width: 350px;
    border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
    text-align:center;
    padding: 3px 20px;
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

const CHANGE_PASSWORD = gql`
    mutation changePassword($password:String! $newPassword:String!){
        changePassword(password:$password newPassword:$newPassword){
            ok
            error
        }
    }
`;

const ME_QUERY = gql`
    query me {
        me{
            nickname
        }
    }
`;

const ChangePassword = () => {
    const {register,handleSubmit,errors,formState,setError,clearErrors,getValues} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {
            changePassword: {ok,error}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
        alert("변경 완료!");
    };
    const {data} = useQuery(ME_QUERY);
    const [changePassword,{loading}] = useMutation(CHANGE_PASSWORD,{onCompleted});
    const onSubmitValid = () => {
        if(loading){
            return;
        }
        const {password,newPassword} = getValues();
        changePassword({
            variables:{
                password,
                newPassword
            }
        });
    };
    const clearChangeError = () => {
        clearErrors("result");
    }
    
    return (
        <FormBox>
            <form onSubmit={handleSubmit(onSubmitValid)}>
            <Bar>{data?.me?.nickname}</Bar>
            <Input
                ref={register({
                    required:"비밀번호를 입력해주세요!",
                    minLength:{
                        value:6,
                        message:"6자리 이상 입력하셔야합니다!"
                    }
                })} 
                onChange={() => clearChangeError()}
                name="password"
                hasError={Boolean(errors?.password?.message)}
                type="password" 
                placeholder="기존 비밀번호"
            />
            <FormError message={errors?.password?.message} />
            <Input
                ref={register({
                    required:"비밀번호를 입력해주세요!",
                    minLength:{
                        value:6,
                        message:"6자리 이상 입력하셔야합니다!"
                    }
                })} 
                onChange={() => clearChangeError()}
                name="newPassword"
                hasError={Boolean(errors?.newPassword?.message)}
                type="password" 
                placeholder="새 비밀번호"
            />
            <FormError message={errors?.newPassword?.message} />
            <br/>   
            <SearchSubmitbutton type="submit" value={loading ? "로딩중..." : "변경"} disabled={!formState.isValid || loading}/>
            <FormError message={errors?.result?.message}/>
            </form>
        </FormBox>
    );
}

export default ChangePassword;