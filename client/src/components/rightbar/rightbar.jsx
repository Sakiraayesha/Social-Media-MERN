import './rightbar.css';
import {Users} from '../../testData';
import Online from '../online/online'

function Rightbar({profile}){
    const HomeRightbar = () => {
        return(
            <>
                <div className="birthdayContainer">
                    <img src="assets/appimage/birthday.png" alt="Birthday" className="birthdayImg"/>
                    <span className="birthdayText">
                        <b>Elif Shafak</b> and <b>2 others</b> have their birthdays today!
                    </span>
                </div>
                <img src="assets/appimage/ad.jpg" alt="Ad" className="rightbarAd" />
                <h4 className='rightbarTitle'>Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        );
    }

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className='rightbarTitle'>User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue"> New York</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Long Island, New York</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>Friends</h4>
                <div className="rightbarFollowings">
                    {Users.map((u) => (
                        <div key = {u.id} className="rightbarFollowing">
                            <img src={u.image} alt="Profile Image" className="rightbarFollowingImg" />
                            <span className="rightbarFollowingName">{u.username}</span>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return(
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {profile? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    );
}

export default Rightbar;