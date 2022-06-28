import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

function Share(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext); 
    const caption = useRef();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            caption: caption.current.value
        }

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;

            try{
                await axios.post("/upload", data);
            }
            catch(err){
                console.log(err);
            }
        }

        try{
            await axios.post("/posts", newPost);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    };

    return(
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImage' src={user.profilePicture? PF + user.profilePicture : PF + "profileimage/fallback.jpg"} alt='Profile Image'/>
                    <input placeholder={"What's on your mind " + user.username + "?"} className='shareInput' ref={caption}/>
                </div>
                <hr className='shareHr'/>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="Image" />
                        <CancelIcon className="shareImgCancel" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor = "file" className="shareOption">
                            <PermMediaIcon htmlColor='tomato' className='shareOptionIcon'/>
                            <span className='shareOptionText'>Photo Or Video</span>
                            <input 
                                style={{display: "none"}}
                                type="file" id="file" accept=".png, .jpeg, .jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <AlternateEmailIcon htmlColor='green' className='shareOptionIcon'/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon htmlColor='blue' className='shareOptionIcon'/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor='orange' className='shareOptionIcon'/>
                            <span className='shareOptionText'>Feeling</span>
                        </div>
                    </div>
                    <button className='shareButton' type="submit">Share</button>
                </form>
            </div>
        </div>
    );
}

export default Share;