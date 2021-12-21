import { useReactiveVar } from "@apollo/client";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faPhoneVolume, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
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
 
const Btn = styled.span`
    background-color: ${(props) => props.theme.accent};
    color: white;
    border-radius: 4px;
    padding: 5px 15px;
    font-weight: 600;
`;
 
const Button = styled.span`
    background-color: ${(props) => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    color: white;
    font-weight: 600;
`;

export const Header = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const loggedInUser = useUser();
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <FontAwesomeIcon icon={faPhoneVolume} size="lg"/>
                
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
                          더보기 
                        </Icon>
                        <Icon>
                          <FontAwesomeIcon icon={faBell} size="lg" />  
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