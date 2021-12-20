import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { createUploadLink } from "apollo-upload-client"

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);

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