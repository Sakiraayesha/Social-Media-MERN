import './profile.css';

import Header from "../../components/header/header";
import Leftbar from "../../components/leftbar/leftbar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightbar/rightbar";

function Profile(){
    return (
        <>
            <Header/>
            <div className="profile">
                <Leftbar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src="assets/cover/1.jpg" alt="Cover Image" className="profileCoverImg" />
                            <img src="assets/profileimage/1.jpg" alt="Profile Image" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Rachel Green</h4>
                            <span className="profileInfoBio">No Uterus, No Opinion.</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed/>
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;