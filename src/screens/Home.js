import { gql, useQuery } from "@apollo/client"
import styled from "styled-components";
import { Paper, TableBody, TableCell, TableContainer, Table, TableRow } from '@mui/material';
import { Link } from "react-router-dom";
import routes from "../routes";

const SEE_MAN_OR_WOMAN_QUERY = gql`
    query seeMW{
        seeMW{
            id
            nickname
            profile
            ignored
        }
    }
`;

const AvatarContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

export const Home = () => {
    const { data } = useQuery(SEE_MAN_OR_WOMAN_QUERY);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {data?.seeMW.map((user) => (
                        <TableRow key={user.id}>
                            {user.ignored === false ? (
                                <>
                                    <TableCell>
                                        <AvatarContainer>
                                            <img style={{ maxWidth: "100%" }} src={user.profile} />
                                        </AvatarContainer>
                                    </TableCell>
                                    <TableCell>
                                        {user.nickname}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`${routes.myPage}/${user.nickname}`}>
                                            <span style={{ backgroundColor: "grey", padding: "5px", color: "white", borderRadius: "10%" }}>
                                                프로필 보기
                                            </span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <button>전화하기</button>
                                    </TableCell>
                                </>
                            ): null }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}