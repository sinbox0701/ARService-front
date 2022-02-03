import { Flex, Absolute, Input, Submitbutton, TextArea } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import routes from "../../routes";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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

const VIDEOCALL_START = gql`
    mutation createVideoCall($caller:String! $callee:String! $startTime:String $endTime:String){
        createVideoCall(caller:$caller callee:$callee startTime:$startTime endTime:$endTime){
            ok
            error
        }
    }
`;

const CreateVideoTimeModal = (props) => {
    const {caller, callee, startTime, endTime} = props;
    const history = useHistory();
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {createVideoCall:{ok,error}} = data;
        if(!ok){
            console.log(error);
            return setError("result",{
                message:error
            });
        }
        history.push(routes.home);
    }
    const [createVideoCall,{loading}] = useMutation(VIDEOCALL_START,{onCompleted});
    const onSubmitValid = (data) => {
        //const {title, content} = getValues();
        if(loading){
            return;
        }
        createVideoCall({
            variables:{
                caller,
                callee,
                startTime:String(startTime),
                endTime:String(endTime)
            }
        })
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
                        <Bar>연결이 종료되었습니다!</Bar>
                        <Submitbutton type="submit" value={ loading ? "Loading..." : props.buttonText} disabled={!formState.isValid|| loading}  ml='70px' mt='20px' height='15px' />
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default CreateVideoTimeModal;