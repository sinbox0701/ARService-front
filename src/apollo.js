import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { createUploadLink } from "apollo-upload-client"

const TOKEN = "token";
let ALARM = true;

export const alarmModeVar = makeVar(ALARM);

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
    localStorage.setItem(TOKEN,token);
    isLoggedInVar(true);
}
export const logUserOut = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
}

const authLink = setContext((_,{headers})=>{
    return {
        headers:{
            ...headers,
            token:localStorage.getItem(TOKEN)
        }
    }
});
export const client = new ApolloClient({
    link: authLink.concat(createUploadLink({
        uri:"http://localhost:4000/graphql"
    })),
    cache: new InMemoryCache(),
});