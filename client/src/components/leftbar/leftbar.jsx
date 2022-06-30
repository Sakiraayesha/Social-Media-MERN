import './leftbar.css';
import {Users} from '../../testData';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseFriend from '../closeFriend/closeFriend';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Leftbar(){
    const { user } = useContext(AuthContext);

    return(
        <div className='leftbar'>
            <div className='leftbarWrapper'>
                <ul className='leftbarList'>
                    <Link className='leftbarListItemLink' to={`/settings/${user.username}`}>
                        <li className='leftbarListItem'>
                            <SettingsIcon className='leftbarListItemIcon'/>
                            <span className='leftbarListItemText'>Settings</span>
                        </li>
                    </Link>
                    <Link className='leftbarListItemLink' to={`/`}>
                        <li className='leftbarListItem'>
                            <RssFeedIcon className='leftbarListItemIcon'/>
                            <span className='leftbarListItemText'>Feed</span>
                        </li>
                    </Link>
                    <li className='leftbarListItem'>
                        <ChatIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Chats</span>
                    </li>
                    <li className='leftbarListItem'>
                        <VideoLibraryIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Videos</span>
                    </li>
                    <li className='leftbarListItem'>
                        <GroupsIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Groups</span>
                    </li>
                    <li className='leftbarListItem'>
                        <BookmarksIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Bookmarks</span>
                    </li>
                    <li className='leftbarListItem'>
                        <HelpIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Help</span>
                    </li>
                    <li className='leftbarListItem'>
                        <WorkIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Jobs</span>
                    </li>
                    <li className='leftbarListItem'>
                        <CalendarMonthIcon className='leftbarListItemIcon'/>
                        <span className='leftbarListItemText'>Events</span>
                    </li>
                </ul>
                <button className='leftbarButton'>Show More</button>
                <hr className='leftbarHr'/>
                <ul className='leftbarFriendList'>
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Leftbar;