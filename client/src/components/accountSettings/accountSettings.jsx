import "./accountSettings.css";
import { useRef } from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function AccountSettings(){
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const { user, dispatch } = useContext(AuthContext);
    const [ update,setUpdate ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Passwords don't match!");
        }
        else{
            const userUpdate = {
                userId: user._id,
            };

            if(username.current.value && username.current.value !== user.username){
                userUpdate.username = username.current.value;
            }
            if(email.current.value && email.current.value !== user.email){
                userUpdate.email = email.current.value;
            }
            if(password.current.value && password.current.value !== user.password){
                userUpdate.password = password.current.value;
            }

            if(username.current.value){
                user.username =  username.current.value;
            }
            else{
                document.getElementById("settingsInputUsername").value = user.username;
            }
            if(email.current.value){
                user.email =  email.current.value;
            }
            else{
                document.getElementById("settingsInputEmail").value = user.email;
            }
            if(password.current.value){
                user.password =  password.current.value;
            }
            else{
                document.getElementById("settingsInputPw").value = user.password;
            }

            try{
                await axios.put("/users/" + user._id, userUpdate);
                dispatch({ type: "UPDATE_ACC_SETTINGS", payload: user });
                setUpdate(true);
                setTimeout(() => {
                    setUpdate(false);
                }, 2000);
            }
            catch(err){
                console.log(err);
            }
        }
    };

    const cancelUpdate = (e) => { 
        e.preventDefault();
        document.getElementById("settingsInputUsername").value = user.username;
        document.getElementById("settingsInputEmail").value = user.email;
        document.getElementById("settingsInputPw").value = user.password;
        document.getElementById("settingsInputConfirmPw").value = user.password;
    }

    const notifyUpdateDOM = () => {
        return (
            <div className="updateSuccessWrapper">
                <div className="updatsuccessText">Account has been successfully updated!</div>
            </div>
        );
    }

    return (
        <div className="accountSettingsWrapper">
            {update? notifyUpdateDOM() : null}
            <div className="settingsRightTop">Account Settings</div>
            <div className="settingsRightBottom">
                <form className="settingsUpdateBox" onSubmit={handleSubmit}>
                    <label htmlFor = "settingsInputUsername" className="settingsInputLabel"> 
                        Username
                    </label>
                    <input id="settingsInputUsername" defaultValue = {user?.username} ref={username} className="settingsInput"/>
                    <label htmlFor = "settingsInputEmail" className="settingsInputLabel"> 
                        Email
                    </label>
                    <input id="settingsInputEmail" defaultValue = {user?.email} type="email" ref={email} className="settingsInput"/>
                    <label htmlFor = "settingsInputPw" className="settingsInputLabel"> 
                        Change Password
                    </label>
                    <input id="settingsInputPw" defaultValue = {user?.password} type="password" ref={password} minLength="6" className="settingsInput"/>
                    <label htmlFor = "settingsInputConfirmPw" className="settingsInputLabel"> 
                        Confirm Password
                    </label>
                    <input id="settingsInputConfirmPw" defaultValue = {user?.password} type="password" ref={confirmPassword} className="settingsInput"/>
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

export default AccountSettings;