import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons"
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Separator from "../components/auth/Separator";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import FormError from "../components/auth/FormError";
import routes from "../routes";
import { Helmet } from "react-helmet-async";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Notification = styled.div`
    color:#2ecc71;
`;

const LOGIN_MUTATION = gql`
    mutation login($nickname:String!, $password:String!){
        login(nickname:$nickname, password:$password){
            ok
            error
            token
        }
    }
`;

export const Login = () => {
    const location = useLocation();
    const {register,handleSubmit,errors,formState,setError,clearErrors,getValues} = useForm({
        mode:"onChange",
        defaultValues:{
            nickname:location?.state?.nickname || "",
            password:location?.state?.password || ""
        }
    });
    const onCompleted = (data) => {
        const {
            login: {ok,error,token}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
        if(token){
            logUserIn(token)
        }
    };
    const [login,{loading}] = useMutation(LOGIN_MUTATION,{
        onCompleted
    });

    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {nickname,password} = getValues();
        login({
            variables:{
                nickname,
                password
            }
        });
    };

    const clearLoginError = () => {
        clearErrors("result");
    }

    return (
        <AuthLayout>
            <Helmet><title>Login</title></Helmet>
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faPhoneVolume} size="3x"/>
                </div>
                <Notification>{location?.state?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}> 
                    <Input
                        ref={register({
                            required:"닉네임을 입력해주세요!",
                        })} 
                        onChange={() => clearLoginError()}
                        name="nickname"
                        hasError={Boolean(errors?.nickname?.message)}
                        type="text" 
                        placeholder="닉네임"
                    />
                    <FormError message={errors?.nickname?.message} />
                    <Input
                        ref={register({
                            required:"비밀번호를 입력해주세요!",
                            minLength:{
                                value:6,
                                message:"6자리 이상 입력하셔야합니다!"
                            }
                        })} 
                        onChange={() => clearLoginError()}
                        name="password"
                        hasError={Boolean(errors?.nickname?.message)}
                        type="password" 
                        placeholder="비밀번호" 
                    />
                    <FormError message={errors?.password?.message} />
                    <Button  bottom="220px" type="submit" value={loading ? "로딩중..." : "로그인 →"} disabled={!formState.isValid || loading} />
                    <FormError message={errors?.result?.message}/>
                </form>
                <Separator>
                    <div></div>
                    <span>OR</span>
                    <div></div>
                </Separator>
                <BottomBox
                    cta="계정이 없으신가요?"
                    linkText="회원가입"
                    link={routes.signUp}
                />
            </FormBox>
        </AuthLayout>
    )
}