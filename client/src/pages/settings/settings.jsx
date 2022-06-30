import './settings.css';
import Header from "../../components/header/header";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AccountSettings from "../../components/accountSettings/accountSettings";
import PersonalSettings from "../../components/personalSettings/personalSettings";
import axios from 'axios';

function Settings(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user, dispatch } = useContext(AuthContext);
    const [showAccSettings, setShowAccSettings] = useState(true);
    const [showPersonalSettings, setShowPersonalSettings] = useState(false);

    const toggleAccSettings = () => {
        setShowAccSettings(true);
        setShowPersonalSettings(false);
    }

    const togglePersonalSettings = () => {
        setShowPersonalSettings(true);
        setShowAccSettings(false);
    }

    const changeProfileImage = async (newProfileImg) => {
        const newImg = {
            userId: user._id,
        };

        if(newProfileImg){
            const data = new FormData();
            const fileName = Date.now() + newProfileImg.name;
            data.append("name", fileName);
            data.append("file", newProfileImg);
            newImg.profilePicture = fileName;

            try{
                await axios.post("/upload/profileimage", data);
                dispatch({ type: "UPDATE_PROFILE_PICTURE", payload: fileName });
            }
            catch(err){
                console.log(err);
            }
        }

        try{
            await axios.put("/users/"  + user._id, newImg);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <>
            <Header/>
            <div className="settings">
                <div className="settingsWrapper">
                    <div className="settingsLeft">
                        <div className="settingsLeftTop">
                            <label htmlFor='changeProfileImg'><AddCircleIcon className="changeProfileImgIcon"/></label>
                            <input 
                                style={{display: "none"}}
                                type="file" id="changeProfileImg" accept=".png, .jpeg, .jpg"
                                onChange={(e) => changeProfileImage(e.target.files[0])}
                            />
                            <img src={user.profilePicture? PF + "profileimage/" + user.profilePicture : PF + "profileimage/fallback.jpg"} alt="Profile Image" className="settingsUserImg" />
                        </div>
                        <div className="settingsLeftBottom">
                            <div className="settingsOptions">
                                <SettingsIcon className="settingsOptionsIcon" />
                                <span className="settingsOptionsText" onClick={() => toggleAccSettings()}>Account Settings</span>
                            </div>
                            <div className="settingsOptions">
                                <PersonIcon className="settingsOptionsIcon" />
                                <span className="settingsOptionsText" onClick={() => togglePersonalSettings()}>Personal Information</span>
                            </div>
                        </div>
                    </div>
                    <div className="settingsRight">
                        {showAccSettings? <AccountSettings/> : null}
                        {showPersonalSettings? <PersonalSettings/> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings;