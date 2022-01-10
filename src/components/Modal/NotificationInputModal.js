import { Flex, Absolute, Input, Submitbutton, TextArea } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form } from 'react-bootstrap';
import styled from "styled-components";

const CREATE_NOTICE_MUTATION = gql`
    mutation createNotice($title:String! $content:String){
        createNotice(title:$title content:$content){
            ok
            error
        }
    }
`;

const NotificationInputModal = (props) => {
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {createNotice:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    };
    const [createNotice,{loading}] = useMutation(CREATE_NOTICE_MUTATION,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {title, content} = getValues();
        if(loading){
            return;
        }
        createNotice({
            variables:{
                title,
                content
            }
        });
        props.setModal(false);
    };
    const clearSignUpError = () => {
        clearErrors("result");
    };
    return (
        <Background>
            <Window>
                <Popup>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <br/>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input 
                            mt='20px' width='200px'
                            ref={register({
                                required:"방 번호를 입력해주세요",
                            })}
                            onChange={()=>clearSignUpError()}
                            name="title"
                            type="text"  
                            placeholder="제목"
                        />
                        <Input
                            mt='20px' width='200px' height="100px"
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="content"
                            type="text"  
                            placeholder="내용"
                        />
                        <Submitbutton type="submit" value={ loading ? "Loading..." : props.buttonText} disabled={!formState.isValid|| loading}  ml='70px' mt='20px' height='15px' />
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default NotificationInputModal;