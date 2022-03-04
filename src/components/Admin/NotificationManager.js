import { gql, useQuery, useMutation } from "@apollo/client"
import { Paper, TableBody, TableCell, TableContainer, Table, TableRow } from '@mui/material';
import { useState } from "react";
import NotificationModal from "../Modal/NotificationModal";
import { Row } from "../shared";
import room_create_button from '../../images/room_create_button.png';
import NotificationInputModal from "../Modal/NotificationInputModal";

const SEE_NOTIFICATIONS = gql`
    query seeNotices{
        seeNotices{
            id
            title
            updatedAt
        }
    }
`;
const REMOVE_NOTICE_MUTATION = gql`
    mutation removeNotice($id:Int!){
        removeNotice(id:$id){
            ok
            error
        }
    }
`;

export const NotificationManager = () => {
    const [modal, setModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [Id, setId] = useState();
    const {data} = useQuery(SEE_NOTIFICATIONS);
    const [removeNotice] = useMutation(REMOVE_NOTICE_MUTATION);
    const onDeleteClick = (e) => {
        const id = Number(e.target.value);
        const removeNoticeUpdate = (cache,result) => {
            const {
                data:{
                    removeNotice:{ok}
                }
            } = result;
            if(ok){
                cache.evict({id:`Notification:${id}`});
            }
        };
        removeNotice({
            variables:{id},
            update:removeNoticeUpdate
        })
    };
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
                            <TableCell>
                                <button value={notice.id} style={{backgroundColor:"transparent", border:"none"}} onClick={onDeleteClick}>❌</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {modal === true ? <NotificationModal setModal={setModal} value={Id}/> : null}
        { createModal === true ? <NotificationInputModal setModal={setCreateModal} buttonText={'생성'} /> : null } 
        <Row>
            <div onClick={()=>setCreateModal(true)} style={{ border: 0, background: 'none',}}>
                <img src={room_create_button} alt='room_create_button'/>
            </div>   
        </Row>
        </>
    )
}