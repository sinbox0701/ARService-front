import { gql, useQuery } from "@apollo/client"
import { Paper, TableBody, TableCell, TableContainer, Table, TableRow } from '@mui/material';
import { useState } from "react";
import { Cal } from "../../hooks/Dates";
import NotificationModal from "../Modal/NotificationModal";

const SEE_NOTIFICATIONS = gql`
    query seeNotices{
        seeNotices{
            id
            title
            updatedAt
        }
    }
`;

export const Notification = () => {
    const [modal, setModal] = useState(false);
    const [Id, setId] = useState();
    const {data} = useQuery(SEE_NOTIFICATIONS);
    const dateFormat = (data) => {
        const dates = Date(data);
        const temp = dates.split(" ",4);
        const month = Cal.indexOf(temp[1])+1;
        const str = `${temp[3]}-${month}-${temp[2]}`;
        return str;
    };
    
    const onClick = (e) => {
        const id = Number(e.target.id);
        setModal(true);
        setId(id);
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {data?.seeNotices.map((notice)=>(
                        <TableRow key={notice.id}>
                            <TableCell>
                                <div id={notice.id} onClick={onClick}>
                                    {notice?.title}
                                </div>
                            </TableCell>
                            <TableCell>
                                { dateFormat(notice?.updatedAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {modal === true ? <NotificationModal setModal={setModal} value={Id}/> : null}
        </>
    )
}