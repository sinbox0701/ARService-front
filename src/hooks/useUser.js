import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me {
        me {
            id
            nickname
            profile
            bio
            isManaged
            ignored
            videoCall
        }
    }
`;

export const useUser = () => {
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data} = useQuery(ME_QUERY,{
        skip:!hasToken,
        pollInterval:500
    });
    useEffect(()=>{
        if(data?.me === null){
            logUserOut();
        }
    },[data]);
    return data;
}