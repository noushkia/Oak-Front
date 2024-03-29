import '../auth.css';

import {Fragment, useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {loginUser} from "../../utils/api/Users";
import {useNavigate} from "react-router-dom";
import {saveJWT} from "../../utils/Session";

function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'login';
        return () => {
        }; // cleanup function
    }, []);

    function login(event) {
        event.preventDefault();
        const formData = {
            username: username,
            password: password,
        };
        setLoading(true);
        loginUser(formData)
            .then(jwt => {
                saveJWT(jwt)
                console.log('Login: success!');
                props.setLoading(true);
                navigate("/home");
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('Login: server down?');
                toast.error('Server not responding');
            }
            setLoading(false);
        });
    }

    return (
        <Fragment>
            <div className="card-front">
                <div className="center-wrap">
                    <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                            <input required={true} onChange={e => setUsername(e.target.value)}
                                   type="text" name="logname" className="form-style" placeholder="Your Username"
                                   id="logname"/>
                            <img className="input-icon" src="/assets/images/svg/user/user.svg" alt=""/>
                        </div>
                        <div className="form-group mt-2">
                            <input required={true} onChange={e => setPassword(e.target.value)}
                                   type="password" name="logpass" className="form-style" placeholder="Your Password"
                                   id="logpass"/>
                            <img className="input-icon" src="/assets/images/svg/user/lock.svg" alt=""/>
                        </div>
                        <button onClick={e => login(e)} type="submit"
                                className="btn mt-4">
                            {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'login'}
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
                            Login with Github
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
