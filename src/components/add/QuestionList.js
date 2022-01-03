import { gql, useQuery } from "@apollo/client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useState } from "react";
import QuestionModal from "../Modal/QuestionModal";
import { Row } from "../shared";
import room_create_button from '../../images/room_create_button.png';
import InputModal from "../Modal/InputModal";
import styled from "styled-components";

const SEE_QUESTIONS_QUERY = gql`
    query seeQuestions{
        seeQuestions{
            id
            title
        }
    }
`;

const Container = styled.div`
    width:100%;
`;

export const QuestionList = () => {
    const [modal, setModal] = useState(false);
    const [Id, setId] = useState();
    const [createModal, setCreateModal] = useState(false);
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {modal === true ? <QuestionModal setModal={setModal} value={Id}/> : null}
        { createModal === true ? <InputModal setModal={setCreateModal} buttonText={'생성'} /> : null } 
        <Row>
            <div onClick={()=>setCreateModal(true)} style={{ border: 0, background: 'none',}}>
                <img src={room_create_button} alt='room_create_button'/>
            </div>   
        </Row>
        </Container>
    )
}