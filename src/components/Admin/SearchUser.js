import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Container } from "../shared"
import SearchBar from "./SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Paper, TableHead } from '@mui/material';
import { Cal } from "../../hooks/Dates";
import styled from "styled-components";

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const SEE_USERS = gql`
    query seeUsers{
        seeUsers{
            id
            nickname
            age
            bio
            profile
            intro
            local
            phone 
            email
            loginCount 
            createdAt
            updatedAt 
        }
    }
`;

const SEE_WOMANS = gql`
    query seeMW{
        seeMW{
            id
            nickname
            age
            bio
            profile
            intro
            local
            phone 
            email
            loginCount 
            createdAt
            updatedAt 
        }
    }
`;

const SEARCH_USER = gql`
    query searchUser(
            $keyword:String, 
            $searchType:Int,
            $bio:SEX,
            $createdMinY:String,
            $createdMinM:String,
            $createdMinD:String,
            $createdMaxY:String,
            $createdMaxM:String,
            $createdMaxD:String
            
        ){
            searchUser(
                keyword:$keyword
                searchType:$searchType
                bio:$bio
                createdMinY:$createdMinY
                createdMinM:$createdMinM
                createdMinD:$createdMinD
                createdMaxY:$createdMaxY
                createdMaxM:$createdMaxM
                createdMaxD:$createdMaxD
                
            ){
                id
                nickname
                age
                bio
                profile
                intro
                local
                phone 
                email
                loginCount 
                createdAt
                updatedAt 
            }
        }
`;

const SearchUser = ({bio}) => {
    const [data,setData] = useState([]);
    const {data:UserAll} = useQuery(SEE_USERS);
    const {data:Womans} = useQuery(SEE_WOMANS);
    const [searchUser,{data:Users}] = useLazyQuery(SEARCH_USER);
    
    useEffect(()=>{
        searchUser({variables:{
            searchType:Number(data[0]),
            keyword:data[1],
            ...(bio === "여자" && {bio:"W"}),
            ...((data[2] !=="") && {createdMinY:String(data[2])}),
            ...((data[3] !=="") &&{createdMinM:String(data[3])}),
            ...((data[4] !=="") &&{createdMinD:String(data[4])}),
            ...((data[5] !=="") &&{createdMaxY:String(data[5])}),
            ...((data[6] !=="") &&{createdMaxM:String(data[6])}),
            ...((data[7] !=="") &&{createdMaxD:String(data[7])})
        }});
    },[data,bio,searchUser]);
    const DateFormat = (data) => {
        const temp = new Date(Number(data));
        const created = String(temp).split(" ");
        const mon = Cal.indexOf(created[1])+1;
        
        const returnValue = `${created[3]}-${mon}-${created[2]}`;
        return returnValue;
    };
    
    return (
        <>
        <Container>
            <SearchBar bio={bio} setData={setData}/>
        </Container>
        {data.length !== 0 ? (
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} style={{alignContent:"center"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    ID
                                </TableCell>
                                <TableCell >
                                    닉네임
                                </TableCell>
                                <TableCell >
                                    프로필
                                </TableCell>
                                <TableCell >
                                    나이
                                </TableCell>
                                <TableCell >
                                    성별
                                </TableCell>
                                <TableCell >
                                    자기소개
                                </TableCell>
                                <TableCell >
                                    지역
                                </TableCell>
                                <TableCell >
                                    폰번호
                                </TableCell>
                                <TableCell >
                                    이메일
                                </TableCell>
                                <TableCell >
                                    로그인 횟수
                                </TableCell>
                                <TableCell >
                                    가입일
                                </TableCell>
                                <TableCell >
                                    마지막 로그인
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {Users?.searchUser?.map((user)=>(
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.id}
                                </TableCell>
                                <TableCell>
                                    {user.nickname}
                                </TableCell>
                                <TableCell>
                                    <AvatarContainer>
                                        <img style={{maxWidth:"100%"}} alt="프로필" src={user.profile}/>
                                    </AvatarContainer>
                                </TableCell>
                                <TableCell>
                                    {user.age}
                                </TableCell>
                                <TableCell>
                                    {user.bio}
                                </TableCell>
                                <TableCell>
                                    {user.intro}
                                </TableCell>
                                <TableCell>
                                    {user.local}
                                </TableCell>
                                <TableCell>
                                    {user.phone}
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {user.loginCount}
                                </TableCell>
                                <TableCell>
                                    {DateFormat(user.createdAt)}
                                </TableCell>
                                <TableCell>
                                    {DateFormat(user.updatedAt)}
                                </TableCell>
                            </TableRow>
                        ))}   
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        ) : ( bio === "전체" ? (
                <Container>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} style={{alignContent:"center"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell >
                                        ID
                                    </TableCell>
                                    <TableCell >
                                        닉네임
                                    </TableCell>
                                    <TableCell >
                                        프로필
                                    </TableCell>
                                    <TableCell >
                                        나이
                                    </TableCell>
                                    <TableCell >
                                        성별
                                    </TableCell>
                                    <TableCell >
                                        자기소개
                                    </TableCell>
                                    <TableCell >
                                        지역
                                    </TableCell>
                                    <TableCell >
                                        폰번호
                                    </TableCell>
                                    <TableCell >
                                        이메일
                                    </TableCell>
                                    <TableCell >
                                        로그인 횟수
                                    </TableCell>
                                    <TableCell >
                                        가입일
                                    </TableCell>
                                    <TableCell >
                                        마지막 로그인
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {UserAll?.seeUsers?.map((user)=>(
                                <TableRow key={user.id}>
                                    <TableCell>
                                        {user.id}
                                    </TableCell>
                                    <TableCell>
                                        {user.nickname}
                                    </TableCell>
                                    <TableCell>
                                        <AvatarContainer>
                                            <img style={{maxWidth:"100%"}} alt="프로필" src={user.profile}/>
                                        </AvatarContainer>
                                    </TableCell>
                                    <TableCell>
                                        {user.age}
                                    </TableCell>
                                    <TableCell>
                                        {user.bio}
                                    </TableCell>
                                    <TableCell>
                                        {user.intro}
                                    </TableCell>
                                    <TableCell>
                                        {user.local}
                                    </TableCell>
                                    <TableCell>
                                        {user.phone}
                                    </TableCell>
                                    <TableCell>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        {user.loginCount}
                                    </TableCell>
                                    <TableCell>
                                        {DateFormat(user.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {DateFormat(user.updatedAt)}
                                    </TableCell>
                                </TableRow>
                            ))}   
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            ) : (
                <Container>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} style={{alignContent:"center"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell >
                                        ID
                                    </TableCell>
                                    <TableCell >
                                        닉네임
                                    </TableCell>
                                    <TableCell >
                                        프로필
                                    </TableCell>
                                    <TableCell >
                                        나이
                                    </TableCell>
                                    <TableCell >
                                        성별
                                    </TableCell>
                                    <TableCell >
                                        자기소개
                                    </TableCell>
                                    <TableCell >
                                        지역
                                    </TableCell>
                                    <TableCell >
                                        폰번호
                                    </TableCell>
                                    <TableCell >
                                        이메일
                                    </TableCell>
                                    <TableCell >
                                        로그인 횟수
                                    </TableCell>
                                    <TableCell >
                                        가입일
                                    </TableCell>
                                    <TableCell >
                                        마지막 로그인
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {Womans?.seeMW?.map((user)=>(
                                <TableRow key={user.id}>
                                    <TableCell>
                                        {user.id}
                                    </TableCell>
                                    <TableCell>
                                        {user.nickname}
                                    </TableCell>
                                    <TableCell>
                                        <AvatarContainer>
                                            <img style={{maxWidth:"100%"}} alt="프로필" src={user.profile}/>
                                        </AvatarContainer>
                                    </TableCell>
                                    <TableCell>
                                        {user.age}
                                    </TableCell>
                                    <TableCell>
                                        {user.bio}
                                    </TableCell>
                                    <TableCell>
                                        {user.intro}
                                    </TableCell>
                                    <TableCell>
                                        {user.local}
                                    </TableCell>
                                    <TableCell>
                                        {user.phone}
                                    </TableCell>
                                    <TableCell>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        {user.loginCount}
                                    </TableCell>
                                    <TableCell>
                                        {DateFormat(user.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {DateFormat(user.updatedAt)}
                                    </TableCell>
                                </TableRow>
                            ))}   
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            ) 
        )}
        </>
    )
}
export default SearchUser;