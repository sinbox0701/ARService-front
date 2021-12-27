import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";
import { faPhoneVolume, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { alarmModeVar, isLoggedInVar } from "../apollo";
import { useUser } from "../hooks/useUser";
import routes from "../routes";

const SHeader = styled.header`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColor};
    padding: 18px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;
 
const Icon = styled.span`
    margin-left: 15px;
`;
 
const Button = styled.span`
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    color: white;
    font-weight: 600;
`;

const AlarmModeBtn = styled.span`
    cursor: pointer;
`;

const TOGGLE_ALARM = gql`
    mutation toggleAlarm{
        toggleAlarm{
            ok
            error
        }
    }
`;

export const Header = () => {
    const history = useHistory();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const loggedInUser = useUser();
    const alarmMode = useReactiveVar(alarmModeVar);
    const [toggleAlarm] = useMutation(TOGGLE_ALARM)
    const onSubmit = () => {
        const toggleAlarmUpdate = (cache,result) =>{
            const {
                data:{
                    toggleAlarm:{ok}
                }
            } = result;
            if(!ok){
                return ;
            }
            cache.modify({
                id:`User:${loggedInUser.me.id}`,
                fields:{
                    ignored(prev){
                        return !prev;
                    }
                }
            })
        };
        toggleAlarm({
            update:toggleAlarmUpdate
        });
        alarmModeVar(!alarmMode);
    };
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <Icon onClick={()=>history.goBack()} >
                        🔙
                    </Icon>
                    {isLoggedIn ? (
                        <>
                        
                        {loggedInUser?.me?.bio === "M" ?(
                            <>
                            <Icon>
                              <FontAwesomeIcon icon={faStar} style={{color:"white", backgroundColor:"red", borderRadius:"80%"}} size="lg" />  
                            </Icon>
                            <Icon>
                                충전 확인
                            </Icon>
                            </>
                        ):(
                            <Icon>
                                포인트 확인
                            </Icon>
                        )}
                        <Icon>
                            <Link to={`${routes.myPage}/${loggedInUser?.me?.nickname}/add`}>
                                더보기 
                            </Link>
                        </Icon>
                        <Icon>
                            <AlarmModeBtn onClick={onSubmit}>
                                <FontAwesomeIcon icon={ alarmMode ? faBell : faBellSlash} size="lg" />  
                            </AlarmModeBtn>
                        </Icon>
                        </>
                    ) : (
                        <Link href={routes.home}><Button>Login</Button></Link>
                    )}
                </Column>
            </Wrapper>
        </SHeader>
    );
}