import "./auth.css";
import "../general/style.css"

import React, {Fragment, useState} from 'react';
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";

function Auth(props) {
    const [isLogin, setIsLogin] = useState(true);

    const handleCheckboxChange = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Fragment>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3">
                                    <span>Log In </span>
                                    <span>Sign Up</span>
                                </h6>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="reg-log"
                                    name="reg-log"
                                    checked={!isLogin}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        {isLogin ? <Login setLoggedIn={props.setLoggedIn} setUsername={props.setUsername}/> :
                                            <SignUp setLoggedIn={props.setLoggedIn} setUsername={props.setUsername}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Auth;
