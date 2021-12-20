import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons"
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Separator from "../components/auth/Separator";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import routes from "../routes";
import { Helmet } from "react-helmet-async";

export const Login = () => {
    return (
        <AuthLayout>
            <Helmet><title>Login</title></Helmet>
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faPhoneVolume} size="3x"/>
                </div>
                <form>
                    <Input type="text" placeholder="닉네임" />
                    <Input type="password" placeholder="비밀번호" />
                    <Button type="submit" value="로그인" />
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