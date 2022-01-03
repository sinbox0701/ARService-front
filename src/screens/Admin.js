import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ME_QUERY = gql`
    query me {
        me {
            isManaged
        }
    }
`;

export const Admin = () => {
    const history = useHistory();
    const {data:Me} = useQuery(ME_QUERY);
    useEffect(()=>{
        if(Me?.me?.isManaged === false && Me?.me?.isManaged === undefined){
            history.push("/");
        }
        
    },[Me]);
    return (
        <>
        <h1>Admin</h1>
        </>
    )
}