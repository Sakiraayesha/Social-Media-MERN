import './closeFriend.css';

function CloseFriend({user}){
    return(
        <li className='leftbarFriend'>
            <img className='leftbarFriendImg' src={user.image} alt='Profile Image'/>
            <span className='leftbarFriendName'>{user.username}</span>
        </li>
    );
}

export default CloseFriend;