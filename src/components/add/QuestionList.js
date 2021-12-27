import { gql, useQuery } from "@apollo/client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"

const SEE_QUESTIONS_QUERY = gql`
    query seeQuestions{
        seeQuestions{
            id
            title
        }
    }
`;

export const QuestionList = () => {
    const {data} = useQuery(SEE_QUESTIONS_QUERY);
    const onClick = () => {};
    return (
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
    )
}