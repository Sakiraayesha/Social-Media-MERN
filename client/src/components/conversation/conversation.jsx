import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({conversation, currentUser}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m)=> m !== currentUser._id);

        const fetchUser = async () => {
            try{
                const res = await axios.get(`/users?userId=${friendId}`);
                setUser(res.data);
            }
            catch(err){
                console.log(err);
            } 
        }
        fetchUser();
    },[conversation, currentUser]);

    return(
        <div className="conversation">
            <img className="conversationImg" src= {user?.profilePicture ? PF + "profileimage/" + user.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image"></img>
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}