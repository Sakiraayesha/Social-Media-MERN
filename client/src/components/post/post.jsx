import './post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Post({post}){
    const [like, setLike] = useState(post.reactions.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.reactions.includes(currentUser._id));
    },[currentUser._id, post.reactions]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try{
            axios.put("/posts/" + post._id + "/react", {userId: currentUser._id}); 
        }
        catch(err){
            console.log(err);
        }
        setLike(isLiked? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return(
        <div className='post'>
            <div className='postWrapper'>
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                            <div className='postProfileLink'>
                                <img className='postProfileImage' src={user.profilePicture ? PF + user.profilePicture : PF + "profileimage/fallback.jpg"} alt='Profile Image'/>
                                <span className='postUsername'>{user.username}</span>
                            </div>
                        </Link>
                        <span className='postDate'>{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.caption}</span>
                    <img style={post.image? {display: "block"} : {display : "none"}} src={PF+"post/" +post.image} alt="Image" className="postImage"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUpIcon htmlColor="blue"  onClick={likeHandler} className="postIcon"/>
                        <FavoriteIcon htmlColor="red" onClick={likeHandler} className="postIcon"/>
                        <span className='postIconText'>{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <ForumIcon htmlColor="green" className="postIcon"/>
                        <span className='postIconText'>{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;