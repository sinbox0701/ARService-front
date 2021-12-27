import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Background, Popup, Window } from "./Modal";

const SEE_NOTICE_QUERY = gql`
    query seeNotice($id:Int!){
        seeNotice(id:$id){
            id
            title
            content
        }
    }
`;

const Absolute = styled.div`
    position: absolute;
    left: ${ props => props.left };
    right: ${ props => props.right };
    top: ${ props => props.top };
    bottom: ${ props => props.bottom };
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${ props => props.padding };
`;

const Bar = styled.div`
    width: 300px;
    border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
    text-align:center;
    padding: 0 20px;
    margin-top: 25px;
    margin-botton: 10px;
    border-radius: 10px;
    background-color:#fafafa;
    border: 1px solid #C4C4C4;
    &::placeholder{
        font-size: 17px;
    }
    width: ${ props => props.width };
    margin-top: ${ props => props.mt };
`;

const NotificationModal = (props) => {
    const id = Number(props.value);
    const {data} = useQuery(SEE_NOTICE_QUERY,{variables:{id}});
    return (
        <Background>
            <Window>
                <Popup>
                    <Flex padding="20px">
                        <Absolute right="15px"><div onClick={()=>props.setModal(false)}>❌</div></Absolute>
                        <Bar mt='20px' width='260px'>{data?.seeNotice?.title}</Bar>
                        <Bar mt='20px' width='260px'>{data?.seeNotice?.content}</Bar>
                    </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default NotificationModal;
