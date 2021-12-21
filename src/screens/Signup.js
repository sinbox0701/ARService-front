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
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Form } from 'react-bootstrap';
import FormError from "../components/auth/FormError";

const Notice = styled.div`
    font-size: 14px;
    color: #858585;
    margin-top: ${props => props.top};
    margin-bottom: ${props => props.bottom};
`;

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

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $nickname: String!
        $password: String!
        $age: Int!
        $bio: SEX!
        $local: String!
        $email:String!
        $phone: String!
        $profile: Upload
        $intro: String!
    ){
        createAccount(
            nickname:$nickname
            password:$password
            age:$age
            bio:$bio
            local:$local
            email:$email
            phone:$phone
            profile:$profile
            intro:$intro
        ){
            ok
            error
        }
    }
`;

export const Signup = () => {
    const {register,handleSubmit,errors,formState,setError,clearErrors,getValues} = useForm({
        mode:"onChange"
    });
    const history = useHistory();

    const onCompleted = (data) => {
        const {createAccount:{ok,error}} = data;
        const {nickname, password} = getValues();
        if(!ok){
            return setError("result",{
                message:error
            });
        }
        history.push(routes.home,{message:"계정 생성 완료!", nickname, password});
    }
    const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {nickname,password,age,bio,local,email,phone,profile,intro} = getValues();
        if(loading){
            return;
        }
        createAccount({
            variables:{
                nickname,
                password,
                age:Number(age),
                bio,
                local,
                email,
                phone,
                profile:profile[0],
                intro
            }
        });
    };

    const clearSignUpError = () => {
        clearErrors("result");
    }

    const [option, setOption] = useState("M");
    const onSelect = (e) => {
        return setOption(()=>e.target.value)
    };

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
                <form onSubmit={handleSubmit(onSubmitValid)} encType={'multipart/form-data'} >
                    <Form.Group controlId="formGridState">
                        <Form.Label><Notice>성별</Notice></Form.Label>
                        <Form.Select defaultValue="M" onChange={onSelect} ref={register({required:"성별을 선택해주세요"})} name="bio">
                            <option value="M">남자</option>
                            <option value="W">여자</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formFile">
                        <Notice top="15px" bottom="10px">프로필 사진을 넣어주세요</Notice>
                        <Form.Control  
                            ref={register()} 
                            onChange={() => clearSignUpError()}
                            name="profile" 
                            type="file" 
                        />
                    </Form.Group>
                    <Input
                        ref={register({
                            required:"닉네임을 입력해주세요!",
                        })} 
                        onChange={() => clearSignUpError()}
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
                        onChange={() => clearSignUpError()}
                        name="password"
                        hasError={Boolean(errors?.password?.message)}
                        type="password" 
                        placeholder="비밀번호"
                    />
                    <FormError message={errors?.password?.message} />
                    <Input
                        ref={register({
                            required:"출생년도를 입력해주세요!",
                            minLength:{
                                value:4,
                                message:"4자리로 입력하셔야합니다! (XXXX)"
                            },
                            maxLength:{
                                value:4,
                                message:"4자리로 입력하셔야합니다! (XXXX)"
                            }
                        })} 
                        onChange={() => clearSignUpError()}
                        name="age"
                        hasError={Boolean(errors?.age?.message)}
                        type="text" 
                        placeholder="출생년도 (숫자 4자리)"
                    />
                    <FormError message={errors?.age?.message} />
                    <Input
                        ref={register({
                            required:"이메일을 입력해주세요!",
                        })} 
                        onChange={() => clearSignUpError()}
                        name="local"
                        hasError={Boolean(errors?.local?.message)}
                        type="text" 
                        placeholder="지역"
                    />
                    <FormError message={errors?.local?.message} />
                    <Input
                        ref={register({
                            required:"이메일을 입력해주세요!",
                        })} 
                        onChange={() => clearSignUpError()}
                        name="email"
                        hasError={Boolean(errors?.email?.message)}
                        type="email" 
                        placeholder="이메일"
                    />
                    <FormError message={errors?.email?.message} />
                    <Input
                        ref={register({
                            required:"핸드폰 번호를 입력해주세요!",
                        })} 
                        onChange={() => clearSignUpError()}
                        name="phone"
                        hasError={Boolean(errors?.phone?.message)}
                        type="text" 
                        placeholder="폰 번호 (-없이 입력하세요)"
                    />
                    <FormError message={errors?.phone?.message} />
                    <Input
                        ref={register({
                            required:"자기소개를 입력해주세요!",
                        })} 
                        onChange={() => clearSignUpError()}
                        name="intro"
                        hasError={Boolean(errors?.intro?.message)}
                        type="text" 
                        placeholder="자기소개"
                    />
                    <FormError message={errors?.intro?.message} />
                    <Button type="submit" value={loading ? "로딩 중...":"가입하기 →"} disabled={!formState.isValid|| loading} />
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
