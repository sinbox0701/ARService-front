
import { useEffect, useState } from "react";
import SearchUser from "../components/Admin/SearchUser";
import { Container } from "../components/shared"

export const Admin = (props) => {
    const {data} = props;
    
    
    return (
        <Container>
            {data ===  "전체" ||  data === "여자" ? (
                <SearchUser bio={data}/>
            ) : <h1>Admin</h1> }
        </Container>
    )
}