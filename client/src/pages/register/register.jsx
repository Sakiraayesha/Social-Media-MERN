import './register.css';

function Register(){
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
                    <div className="registerBox">
                        <input placeholder="Username" className="loginInput" />
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <input placeholder="Confirm Password" className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;