import '../auth.css';

import {Fragment, useEffect, useState} from "react";
import {signUpUser} from "../../utils/api/Users";
import {toast} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'signup';
        return () => {
        }; // cleanup function
    }, []);

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function signUp(e) {
        e.preventDefault();
        setLoading(true);

        if (!username || !email || !password || !birthDate || !address) {
            setLoading(false);
            return toast.error('Please fill in all required fields');
        }

        if (!isValidEmail(email)) {
            setLoading(false);
            return toast.error('Please enter a valid email address');
        }

        const formData = {
            username,
            email,
            password,
            birthDate,
            address,
        };
        signUpUser(formData)
            .then(_ => {
                console.log('SignUp: success!');
                navigate("/login");
            })
            .catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                        toast.error(error.response.data.error);
                    } else {
                        console.log(error);
                        console.log('SignUp: server down?');
                        toast.error('Server not responding');
                    }
                    setLoading(false);
                }
            );
    }

    return (
        <Fragment>
            <div className="card-back">
                <div className="center-wrap">
                    <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                            <input required={true} type="text" name="username" className="form-style"
                                   placeholder="Your Username" id="logname"
                                   onChange={e => setUsername(e.target.value)}/>
                            <img className="input-icon" src="/assets/images/svg/user/user.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="email" name="email" className="form-style"
                                   placeholder="Your Email" id="logemail" onChange={e => setEmail(e.target.value)}/>
                            <img className="input-icon" src="/assets/images/svg/user/mail.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="password" name="password" className="form-style"
                                   placeholder="Your Password" id="logpass"
                                   onChange={e => setPassword(e.target.value)}/>
                            <img className="input-icon" src="/assets/images/svg/user/lock.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="date" name="birthDate" className="form-style"
                                   placeholder="Your Birth Date" id="logdate"
                                   onChange={e => setBirthDate(e.target.value)}/>
                            <img className="input-icon" src="/assets/images/svg/user/calendar.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} type="text" name="address" className="form-style"
                                   placeholder="Your Address" id="logaddress"
                                   onChange={e => setAddress(e.target.value)}/>
                            <img className="input-icon" src="/assets/images/svg/user/location.svg" alt=""/>
                        </div>
                        <button type="submit" className="btn mt-4" onClick={e => signUp(e)}>
                            {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'signup'}
                        </button>
                        <button
                            style={{display: "flex", marginLeft: "15%"}}
                            type="submit"
                            className="btn mt-2"
                            onClick={() =>
                                (window.location.href =
                                    "https://github.com/login/oauth/authorize?client_id=31ca176f1af22ef04b8f&scope=user")
                            }
                        >
                            <img style={{height: "80%", marginRight: "10px"}} src="/assets/images/svg/others/chestnut.svg" alt="Github logo" />
                            Sign Up with Github
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SignUp;
