import './rightbar.css';
import {Users} from '../../testData';
import Online from '../online/online'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function Rightbar({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ followings, setFollowings ] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [ followed, setFollowed ] = useState(currentUser.followings.includes(user?._id)); 
    
    useEffect(() => {
        const getFollowings = async () => {
            try{
                const followingList = await axios.get("/users/followings/" + user?._id);
                setFollowings(followingList.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getFollowings();
    },[user]);

    const handleClick = async () => {
        try{
            if(followed){
                await axios.put("/users/" + user?._id + "/unfollow", {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user?._id });
            }
            else{
                await axios.put("/users/" + user?._id + "/follow", {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user?._id });
            }
            setFollowed(!followed);
        }
        catch(err){
            console.log(err);
        }
    }

    const HomeRightbar = () => {
        return(
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}appimage/birthday.png`} alt="Birthday" className="birthdayImg"/>
                    <span className="birthdayText">
                        <b>Emma</b> and <b>2 others</b> have their birthdays today!
                    </span>
                </div>
                <img src={`${PF}appimage/ad.jpg`} alt="Ad" className="rightbarAd" />
                <h4 className='rightbarTitle'>Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        );
    }

    const ProfileRightbar = () => {
        return (
            <>
                {(user.username !== currentUser.username) && (
                    <button className='rightbarFollowButton' onClick={handleClick}>
                        {followed? <PersonRemoveIcon/> : <PersonAddIcon/>}
                        {followed? "Unfollow" : "Follow"}
                    </button>
                )}
                <h4 className='rightbarTitle'>User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue"> 
                            {user.city ? user.city : "-"}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">
                            {user.from ? user.from : "-"}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {   
                                user.relationship ===  1 
                                ? "Single"
                                : user.relationship ===  2
                                ? "Married"
                                : "-"
                            }
                            </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>Friends</h4>
                <div className="rightbarFollowings">
                    {followings.map((f) => (
                        <Link to={`/profile/${f.username}`} style={{textDecoration:"none"}} key = {f._id} >
                            <div className="rightbarFollowing">
                                <img src={f.profilePicture? PF + f.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{f.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    }

    return(
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    );
}

export default Rightbar;