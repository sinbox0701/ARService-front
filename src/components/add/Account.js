import styled from "styled-components";
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import { Input } from "../shared";
import FormBox from "../auth/FormBox";
import FormError from "../auth/FormError";
import Button from "../auth/Button";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

const Container = styled.div`
    width:100%;
`;

const CHARGE_ACCOUNT = gql`
    mutation chargeAccount($cash:Int!){
        chargeAccount(cash:$cash){
            ok
            error
        }
    }
`;

const Account = () => {
    const {register,handleSubmit,errors,formState,setError,clearErrors,getValues} = useForm({
        mode:"onChange",
    });
    const history = useHistory();
    const onCompleted = (data) => {
        const {
            chargeAccount: {ok,error}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
        history.push(routes.home);
    };
    const [chargeAccount,{loading}] = useMutation(CHARGE_ACCOUNT,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {cash} = getValues();
        chargeAccount({
            variables:{
                cash: Number(cash)
            }
        });
    };
    const clearAccountError = () => {
        clearErrors("result");
    }

    return (
        <Container>
            <FormBox>
                <FormError message={errors?.result?.message}/>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        ref={register({
                            required:"금액 입력",
                        })}
                        onChange={() => clearAccountError()}
                        name="cash"
                        hasError={Boolean(errors?.cash?.message)}
                        type="text" 
                        placeholder="입금 금액"
                    />
                    <Input
                        ref={register()}
                        onChange={() => clearAccountError()}
                        name="nickname"
                        type="text" 
                        placeholder="닉네임"
                    />
                    <Button style={{width:"50%"}}  type="submit" value={loading ? "로딩중..." : "계좌이체하기"} disabled={ loading} />
                </form>
            </FormBox>
        </Container>
    );
};

export default Account;