import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../components/shared";
import routes from "../routes";

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

const VIDEOCALL_CHECK = gql`
    mutation videoCallCheck($id:Int!){
        videoCallCheck(id:$id){
            ok
            error
        }
    }
`;

const SEE_PROFILE_QUERY = gql`
    query seeProfile($nickname:String!){
        seeProfile(nickname:$nickname){
            id,
            nickname,
            profile,
            intro,
            ignored,
            videoCall
        }
    }
`;

export const MyPage = () => {
    const { nickname } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            nickname
        }
    });
    const [videoCallCheck] = useMutation(VIDEOCALL_CHECK,{variables:{id:data?.seeProfile?.id}});
    const onSubmit = () => {
        const userVideoUpdate = (cache, result) => {
            const {
                data: {
                    videoCallCheck: { ok }
                }
            } = result;
            if (!ok) {
                return;
            }
            cache.modify({
                id: `User:${data.seeProfile.id}`,
                fields: {
                    videoCall(prev) {
                        return !prev;
                    }
                }
            })
        };
        videoCallCheck({
            update: userVideoUpdate
        });
    };
    return (
        <Container>
            <AvatarContainer>
                <img style={{ maxWidth: "100%" }} alt="profile" src={data?.seeProfile?.profile} />
            </AvatarContainer>
            <Bar>{data?.seeProfile?.nickname}</Bar>
            <Bar>{data?.seeProfile?.intro}</Bar>
            <button style={{ marginTop: "10px" }}>통화하기</button>
            <Link to={`${routes.videoCall}/${nickname}/video`}>
                <button style={{ marginTop: "10px" }} disabled={!data?.seeProfile?.videoCall} onClick={onSubmit}>영상통화</button>
            </Link>
        </Container>
    )
}