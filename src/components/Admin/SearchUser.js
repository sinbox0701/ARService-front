import { Container } from "../shared"
import SearchBar from "./SearchBar";


const SearchUser = ({bio}) => {
    return (
        <Container>
            <SearchBar bio={bio}/>
        </Container>
    )
}
export default SearchUser;