import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ friends, setFriends] = useState([]);
    const [ onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/followings/"+currentId);
            setFriends(res.data);
        }
        getFriends();
    },[currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    },[friends, onlineUsers]);

    const handleClick = async (user) => {
        try{
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div key={o._id} className="chatOnlineFriend" onClick={() => handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                        <img className="chatOnlineImg" src= {o.profilePicture? PF + "profileimage/" + o.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image"></img>
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o.username}</span>
                </div>
            ))}  
        </div>
    );
}