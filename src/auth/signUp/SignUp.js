// todo: Should we collect the data and add new user?
import '../auth.css';

import {Fragment, useEffect} from "react";


function SignUp() {

    useEffect(() => {
        document.title = 'signup';
        return () => {}; // cleanup function
    }, []);

    return (
        <Fragment>
            <div className="card-back">
                <div className="center-wrap">
                    <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                            <input required={true} type="text" name="logname" className="form-style"
                                   placeholder="Your Username" id="logname"/>
                            <img className="input-icon" src="/assets/images/svg/user/user.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="email" name="logemail" className="form-style"
                                   placeholder="Your Email" id="logemail"/>
                            <img className="input-icon" src="/assets/images/svg/user/mail.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="password" name="logpass" className="form-style"
                                   placeholder="Your Password" id="logpass"/>
                            <img className="input-icon" src="/assets/images/svg/user/lock.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="date" name="logdate" className="form-style"
                                   placeholder="Your Birth Date" id="logdate"/>
                            <img className="input-icon" src="/assets/images/svg/user/calendar.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="text" name="logaddress" className="form-style"
                                   placeholder="Your Birth Date" id="logaddress"/>
                            <img className="input-icon" src="/assets/images/svg/user/location.svg" alt=""/>
                        </div>
                        <button type="submit" className="btn mt-4">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SignUp;
