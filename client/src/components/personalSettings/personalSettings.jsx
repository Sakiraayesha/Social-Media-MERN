import "./personalSettings.css";
import { useRef } from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function PersonalSettings(){
    const bio = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const { user, dispatch } = useContext(AuthContext);
    const [ update,setUpdate ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userUpdate = {
            userId: user._id,
        };

        if(bio.current.value !== user.bio){
            userUpdate.bio = bio.current.value;
        }
        if(city.current.value !== user.city){
            userUpdate.city = city.current.value;
        }
        if(from.current.value !== user.from){
            userUpdate.from = from.current.value;
        }
        if(relationship.current.value !== user.relationship){
            userUpdate.relationship = relationship.current.value;
        }

        user.bio =  bio.current.value;
        user.city =  city.current.value;
        user.from =  from.current.value;
        user.relationship =  relationship.current.value;

        try{
            await axios.put("/users/" + user._id, userUpdate);
            dispatch({ type: "UPDATE_USER_INFO", payload: user });
            setUpdate(true);
            setTimeout(() => {
                setUpdate(false);
            }, 2000);
        }
        catch(err){
            console.log(err);
        }
    };

    const cancelUpdate = (e) => { 
        e.preventDefault();
        document.getElementById("settingsInputBio").value = user.bio ? user.bio : "";
        document.getElementById("settingsInputCity").value = user.city ? user.city : "";
        document.getElementById("settingsInputFrom").value = user.from ? user.from : "";
        document.getElementById("settingsInputRelationship").value = user.relationship ? user.relationship : "0";
    }
    
    const notifyUpdateDOM = () => {
        return (
            <div className="updateSuccessWrapper">
                <div className="updatsuccessText">User information has been successfully updated!</div>
            </div>
        );
    }

    return (
        <div className="personalSettingsWrapper">
            {update? notifyUpdateDOM() : null}
            <div className="settingsRightTop">Personal Information</div>
            <div className="settingsRightBottom">
                <form className="settingsUpdateBox" onSubmit={handleSubmit}>
                    <label htmlFor = "settingsInputBio" className="settingsInputLabel"> 
                        Bio
                    </label>
                    <input id="settingsInputBio" defaultValue={user.bio ? user.bio : ""} placeholder="Write something about yourself" ref={bio} className="settingsInput" />
                    <label htmlFor = "settingsInputCity" className="settingsInputLabel"> 
                        City 
                    </label>
                    <input id="settingsInputCity" defaultValue={user.city ? user.city : ""} placeholder="City" ref={city} className="settingsInput" />
                    <label htmlFor = "settingsInputFrom" className="settingsInputLabel"> 
                        From
                    </label>
                    <input id="settingsInputFrom"  defaultValue={user.from ? user.from : ""} placeholder="From" ref={from} className="settingsInput" />
                    <label htmlFor = "settingsInputRelationship" className="settingsInputLabel"> 
                        Relationship Status
                    </label>
                    <select id="settingsInputRelationship" defaultValue={user.relationship ? user.relationship : ""} ref={relationship} className="settingsInput">
                        <option value="0">-</option>
                        <option value="1">Single</option>
                        <option value="2">Married</option>
                        <option value="3">Complicated</option>
                    </select>
                    <div className="settingsButtonsContainer">
                        <button className="settingsButton" type="submit">
                            Update
                        </button>
                        <button className="settingsButton" onClick={cancelUpdate}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalSettings;