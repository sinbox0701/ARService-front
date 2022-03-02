import { AccountTransferManager } from "../components/Admin/AccountTransferManager";
import AddManager from "../components/Admin/AddManager";
import ChangePassword from "../components/Admin/ChangePassword";
import { NotificationManager } from "../components/Admin/NotificationManager";
import { QuestionListManager } from "../components/Admin/QuestionListManager";
import SearchUser from "../components/Admin/SearchUser";
import { Container } from "../components/shared"

export const Admin = (props) => {
    const {data} = props;
    
    if(data ===  "전체" ||  data === "여자"){
        return (
            <Container>
                <SearchUser bio={data}/>   
            </Container>
        )
    }
    else if(data === "비번 변경"){
        return (
            <Container>
                <ChangePassword/>
            </Container>
        )
    }
    else if(data === "관리자 추가"){
        return (
            <Container>
                <AddManager/>
            </Container>
        )
    }
    else if(data === "고객문의"){
        return (
            <Container>
                <QuestionListManager/>
            </Container>
        )
    }
    else if(data === "계좌이체"){
        return (
            <Container>
                <AccountTransferManager/>
            </Container>
        )
    }
    else if(data === "공지사항"){
        return (
            <Container>
                <NotificationManager/>
            </Container>
        )
    }
    else {
        return (
            <Container>
                <h1>Admin</h1>
            </Container>
        )    
    }
}