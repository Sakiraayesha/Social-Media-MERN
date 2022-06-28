import './profile.css';
import Header from "../../components/header/header";
import Leftbar from "../../components/leftbar/leftbar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {useParams} from "react-router";

function Profile(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState([]);
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);

    return (
        <>
            <Header/>
            <div className="profile">
                <Leftbar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture? PF + user.coverPicture : PF + "cover/fallback.jpg"} alt="Cover Image" className="profileCoverImg" />
                            <img src={user.profilePicture? PF + user.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoBio">{user.bio}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;