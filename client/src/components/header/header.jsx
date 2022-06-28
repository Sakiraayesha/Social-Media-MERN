import "./header.css";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Header(){
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">MySocial</span>
                </Link>
            </div>
            <div className="headerCenter">
                <div className="searchBar">
                    <PersonSearchIcon className="searchIcon"/>
                    <input placeholder="Search for a friend" className="searchInput"/>
                </div>
            </div>
            <div className="headerRight">
                <div className="headerLinks">
                    <span className="headerLink">Home</span>
                    <span className="headerLink">Profile</span>
                </div>
                <div className="headerIcons">
                    <div className="headerIconItem">
                        <PersonIcon/>
                        <span className="headerIconBadge">1</span>
                    </div>
                    <div className="headerIconItem">
                        <ChatIcon/>
                        <span className="headerIconBadge">2</span>
                    </div>
                    <div className="headerIconItem">
                        <NotificationsIcon/>
                        <span className="headerIconBadge">1</span>
                    </div>
                </div>
                <Link to={`profile/${user.username}`}>
                    <img 
                        src={user.profilePicture? PF + user.profilePicture : PF + 'profileimage/fallback.jpg'} 
                        alt="Profile Image" 
                        className="headerImage"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Header;