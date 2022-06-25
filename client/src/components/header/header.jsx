import "./header.css";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Header(){
    return (
        <div className="headerContainer">
            <div className="headerLeft">
                <span className="logo">MySocial</span>
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
                <img src="assets/profileimage/1.jpg" alt="Profile Image" className="headerImage"/>
            </div>
        </div>
    );
}

export default Header;