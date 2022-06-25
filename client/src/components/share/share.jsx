import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

function Share(){
    return(
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImage' src='assets/profileimage/1.jpg' alt='Profile Image'/>
                    <input placeholder="What's on your mind?" className='shareInput'/>
                </div>
                <hr className='shareHr'/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMediaIcon htmlColor='tomato' className='shareOptionIcon'/>
                            <span className='shareOptionText'>Photo Or Video</span>
                        </div>
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
                    <button className='shareButton'>Share</button>
                </div>
            </div>
        </div>
    );
}

export default Share;