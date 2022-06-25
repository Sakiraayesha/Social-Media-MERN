import './post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import {Users} from '../../testData';
import { useState } from 'react';

function Post({post}){
    const [like, setLike] = useState(post.reaction);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        setLike(isLiked? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    return(
        <div className='post'>
            <div className='postWrapper'>
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImage' src={Users.filter((u) => u.id === post?.userId)[0].image} alt='Profile Image'/>
                        <span className='postUsername'>{Users.filter((u) => u.id === post?.userId)[0].username}</span>
                        <span className='postDate'>{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.caption}</span>
                    <img src={post.image} alt="Image" className="postImage"/>
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