import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components";
import { FatLink } from "../components/shared";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import { Helmet } from "react-helmet-async";

const HeaderContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
`; 
 
const Subtitle = styled(FatLink)`
    font-size:16px;
    text-align:center;
    margin-top: 10px;
`;

export const Signup = () => {
    return (
        <AuthLayout>
            <Helmet><title>Sign Up</title></Helmet>
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faPhoneVolume} size="3x" />
                    <Subtitle>
                        폰팅 서비스
                    </Subtitle>
                </HeaderContainer>
                <form>
                    <Input/>
                    <Input/>
                    <Input/>
                    <Button type="submit" value="회원가입" />
                </form>
            </FormBox>
            <BottomBox
                cta="계정이 있나요?"
                linkText="로그인"
                link={routes.home}
            />
        </AuthLayout>
    )
}
