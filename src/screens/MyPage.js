import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../components/shared";

const AvatarContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flex;
        justify-items: center;
        flex-direction: column;
        align-items: center;
    }
`;
const Bar = styled.div`
    margin-top: 10px;
    display: flex;
    background-color: white;
    color: black;
    justify-content: center;
    align-items: center;
    width:50%;
`;

const SEE_PROFILE_QUERY = gql`
    query seeProfile($nickname:String!){
        seeProfile(nickname:$nickname){
            nickname,
            profile,
            intro
        }
    }
`;

export const MyPage = () => {
    const {nickname} = useParams();
    const {data} = useQuery(SEE_PROFILE_QUERY,{
        variables:{
            nickname
        }
    })
    return (
        <Container>
            <AvatarContainer>
                <img style={{maxWidth:"100%"}} src={data?.seeProfile?.profile}/>
            </AvatarContainer>
            <Bar>{data?.seeProfile?.nickname}</Bar>
            <Bar>{data?.seeProfile?.intro}</Bar>
            <button style={{marginTop:"10px"}}>통화하기</button>
            <button style={{marginTop:"10px"}}>영상통화</button>
        </Container>
    )
}