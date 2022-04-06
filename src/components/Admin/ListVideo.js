import { gql, useQuery } from "@apollo/client"
import { Paper, TableBody, TableCell, TableContainer, Table, TableRow } from '@mui/material';

const LIST_VIDEO = gql`
    query seeVideoCalls{
        seeVideoCalls{
            id
            caller
            callee
            startTime
            timeCount
        }
    }
`;


export const ListVideo = () => {
    const {data} = useQuery(LIST_VIDEO);

    const dateFormat = (data) => {
        const d =  new Date(data);

        return d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " (" +  '일월화수목금토'.charAt(d.getUTCDay())+')';
        
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {data?.seeVideoCalls.map((video)=>(
                        <TableRow key={video.id}>
                            <TableCell>
                                {video?.caller}
                            </TableCell>
                            <TableCell>
                                {video?.callee}
                            </TableCell>
                            <TableCell>
                                {dateFormat(video?.startTime)}
                            </TableCell>
                            <TableCell>
                                {video?.timeCount}초
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}