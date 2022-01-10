import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Input, Submitbutton } from "../shared";
import { Background, Popup, Window } from "./Modal";
import { useForm } from "react-hook-form";

const READ_QUESTION_QUERY = gql`
    query readQuestion($id:Int!){
        readQuestion(id:$id){
            id
            title
            content
            answer{
                id
                content
                author
            }
        }
    }
`;
const DELETE_COMMENT = gql`
    mutation deleteAnswer($id:Int!){
        deleteAnswer(id:$id){
            ok
            error
        }
    }
`;

const CREATE_COMMENT =gql`
mutation createAnswer($questionId:Int! $content:String!){
        createAnswer(questionId:$questionId content:$content){
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

const CommentInputModal = (props) => {
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const id = Number(props.value);
    const {data} = useQuery(READ_QUESTION_QUERY,{variables:{id}});
    const onCompleted = (data) => {
        const {createAnswer:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    };
    const [deleteAnswer] = useMutation(DELETE_COMMENT);
    const onDeleteClick = (e) => {
        const id = Number(e.target.value);
        const deleteAnswerUpdate = (cache,result) => {
            const {
                data:{
                    deleteAnswer:{ok}
                }
            } = result;
            if(ok){
                cache.evict({id:`Answer:${id}`});
            }
        };
        deleteAnswer({
            variables:{id},
            update:deleteAnswerUpdate
        })
    };
    const [createAnswer,{loading}] = useMutation(CREATE_COMMENT,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {content} = getValues();
        createAnswer({
            variables:{
                questionId:id,
                content
            }
        });
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
                        <Bar mt='20px' width='260px'>제목: {data?.readQuestion?.title}</Bar>
                        <Bar mt='20px' width='260px'>내용: {data?.readQuestion?.content}</Bar>
                        {data?.readQuestion?.answer?.content !== undefined ?(
                            <div>
                                <Bar mt='20px' width='260px'>답변: {data?.readQuestion?.answer?.content}</Bar>
                                <button value={data?.readQuestion?.answer?.id} style={{backgroundColor:"transparent", border:"none", marginLeft:"100px"}} onClick={onDeleteClick}>답글 삭제</button>

                            </div>
                            ) : (
                            <form onSubmit={handleSubmit(onSubmitValid)}>
                                <Input 
                                    mt='20px' 
                                    width='200px'
                                    ref={register()}
                                    name="content"
                                    type="text"
                                    onChange={()=>clearCommentError()}
                                    placeholder= {`답변:`}    
                                />
                                <Submitbutton type="submit" value={ loading ? "Loading..." : "답변 달기"} disabled={!formState.isValid|| loading}  ml='70px' mt='20px' height='15px' />
                            </form>
                        )}
                        
                    </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default CommentInputModal;
