import { gql, useQuery } from "@apollo/client"
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useState } from "react";
import styled from "styled-components";
import AccountModal from "../Modal/AccountModal";

const SEE_ACCOUNT_LIST_QUERY = gql`
    query seeAccountTransfers{
        seeAccountTransfers{
            id
            cash
            user{
                nickname
                phone
            }
            createdAt
        }
    }
`;

const Container = styled.div`
    width:100%;
`;

export const AccountTransferManager = () => {
    const [modal, setModal] = useState(false);
    const [Id, setId] = useState();
    const {data} = useQuery(SEE_ACCOUNT_LIST_QUERY);
    const dateFormat = (data) => {
        const dates =  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(data);
        const temp = dates.split("/");
        const str = `${temp[2]}-${temp[0]}-${temp[1]}`;
        return str;
    };
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
                    {data?.seeAccountTransfers.map((account)=>(
                        <TableRow key={account.id}>
                            <TableCell>
                                <div id={account.id} onClick={onClick}>
                                    {account.id}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div id={account.id} onClick={onClick}>
                                    {account.user.nickname}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div id={account.id} onClick={onClick}>
                                    {account.user.phone}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div id={account.id} onClick={onClick} style={{color:"blue"}}>
                                    신청중
                                </div>
                            </TableCell>
                            <TableCell>
                                <div id={account.id} onClick={onClick}>
                                    {account.cash}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div id={account.id} onClick={onClick}>
                                    {dateFormat(account.createdAt)}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {modal === true ? <AccountModal setModal={setModal} value={Id}/> : null}
        </Container>
    )
}