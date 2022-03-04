import { gql, useQuery } from "@apollo/client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useState } from "react";
import styled from "styled-components";
import CommentInputModal from "../Modal/CommentInputModal";

const SEE_QUESTIONS_QUERY = gql`
    query seeQuestions{
        seeQuestions{
            id
            title
            user{
                nickname
            }
        }
    }
`;

const Container = styled.div`
    width:100%;
`;

export const QuestionListManager = () => {
    const [modal, setModal] = useState(false);
    const [Id, setId] = useState();
    const {data} = useQuery(SEE_QUESTIONS_QUERY);
    const onClick = (e) => {
        const id = Number(e.target.id);
        setModal(true);
        setId(id);
    };
    return (
        <Container>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {data?.seeQuestions.map((question)=>(
                        <TableRow key={question.id}>
                            <TableCell>
                                <div id={question.id} onClick={onClick}>
                                    {question.title}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div id={question.id} onClick={onClick}>
                                    {question.user.nickname}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {modal === true ? <CommentInputModal setModal={setModal} value={Id}/> : null}
        </Container>
    )
}