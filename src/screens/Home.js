import { isLoggedInVar } from "../apollo"

export const Home = () => {
    return (
        <>
        <h1>Home</h1>
        <button onClick={()=>isLoggedInVar(false)}>LogOut!</button>
        </>
    )
}