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
    const [ followers, setFollowers ] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    
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
    },[user?._id]);

    useEffect(() => {
        const getFollowers = async () => {
            try{
                const followerList = await axios.get("/users/followers/" + user?._id);
                setFollowers(followerList.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getFollowers();
    },[user?._id]);

    const handleClick = async () => {
        try{
            if(currentUser.followings.includes(user?._id)){
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
                        {currentUser.followings.includes(user?._id)? <PersonRemoveIcon/> : <PersonAddIcon/>}
                        {currentUser.followings.includes(user?._id)? "Unfollow" : "Follow"}
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
                                : user.relationship ===  3
                                ? "Complicated"
                                : "-"
                            }
                            </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>Following</h4>
                <div className="rightbarFollowings">
                    {
                    followings.length ?
                    followings.map((f) => (
                        <Link to={`/profile/${f.username}`} style={{textDecoration:"none"}} key = {f._id} >
                            <div className="rightbarFollowing">
                                <img src={f.profilePicture? PF + "profileimage/" + f.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{f.username}</span>
                            </div>
                        </Link>
                    ))
                    : <div className="rightbarNoneFollowing">{(user.username !== currentUser.username) ? "This user does not" : "You do not"} follow anyone yet.</div>
                    }
                </div>
                <h4 className='rightbarTitle'>Followers</h4>
                <div className="rightbarFollowings">
                    {
                    followers.length ?
                    followers.map((f) => (
                        <Link to={`/profile/${f.username}`} style={{textDecoration:"none"}} key = {f._id} >
                            <div className="rightbarFollowing">
                                <img src={f.profilePicture? PF + "profileimage/" + f.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{f.username}</span>
                            </div>
                        </Link>
                    ))
                    : <div className="rightbarNoneFollowing">{(user.username !== currentUser.username) ? "This user does not" : "You do not"}  have any followers yet.</div>
                    }
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