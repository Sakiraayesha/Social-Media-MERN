import './register.css';
import { useRef } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import {Link} from 'react-router-dom';

function Register(){
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Passwords don't match!");
        }
        else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };

            try{
                await axios.post("/auth/register", user);
                navigate("/login");
            }
            catch(err){
                console.log(err);
            }
        }
    };

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">MySocial</h3>
                    <span className="loginDesc">
                        Connect with friends around the world!
                    </span>
                </div>
                <div className="loginRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" type="email" required ref={email} className="loginInput" />
                        <input placeholder="Password" type="password" required ref={password} minLength="6" className="loginInput" />
                        <input placeholder="Confirm Password" type="password" required ref={confirmPassword} className="loginInput" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link to="/login" className="loginButtonLink">
                            <button className="loginRegisterButton">
                                Log into account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;