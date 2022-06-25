import './online.css';

function Online({user}){
    return(
        <li className='rightbarFriend'>
            <div className="rightbarProfileImgContainer">
                <img src={user.image} alt="Profile Image" className="rightbarProfileImg"/>
                <span className="rightbarOnline"></span>
            </div>
            <div className="rightbarUsername">{user.username}</div>
        </li>
    );
}

export default Online;