import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../components/shared";
import { useUser } from "../hooks/useUser";
import routes from "../routes";

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

export const MyPagePlus = () => {
    const loggedInUser = useUser();

    return (
        <Container>
            <Link to={`${routes.myPage}/${loggedInUser?.me?.nickname}/notification`}>
                <button style={{marginTop:"10px"}}>공지사항</button>
            </Link>
            <Link to={`${routes.myPage}/${loggedInUser?.me?.nickname}/question`}>
                <button style={{marginTop:"10px"}}>고객센터</button>
            </Link>
            <button style={{marginTop:"10px"}}>이용안내</button>
            <button style={{marginTop:"10px"}}>포인트 교환 신청</button>
        </Container>
    )
}