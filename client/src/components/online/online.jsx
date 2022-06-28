import './online.css';

function Online({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <li className='rightbarFriend'>
            <div className="rightbarProfileImgContainer">
                <img src={PF+user.image} alt="Profile Image" className="rightbarProfileImg"/>
                <span className="rightbarOnline"></span>
            </div>
            <div className="rightbarUsername">{user.username}</div>
        </li>
    );
}

export default Online;