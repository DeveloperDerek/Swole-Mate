import MainNavbar from '../components/main/MainNavbar'
import Match from '../components/main/Match'
import { useParams } from 'react-router-dom';
const UserPage = () => {

    const { id } = useParams();
    
    return(
        <div className="userpage">
            <MainNavbar />
            <Match id={id}/>
        </div>
    )
}

export default UserPage