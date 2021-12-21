import styled from "styled-components";
import { Header } from "./Header";
 
const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;
 
export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <Content>{children}</Content>
        </>
    );
}
