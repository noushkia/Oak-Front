import {Fragment, useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import '../auth.css';


function Login(props) {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => document.title = 'login', []);

    function submitName(e) {
        e.preventDefault();
        if (!username)
            return;
        setLoading(true);
        getUser(username)
            .then(user => {
                props.setUser(user);
                saveUsername(username);
                props.setLoggedIn(true);
                console.log(username);
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
                            <input type="password" name="logpass" className="form-style"
                                   placeholder="Your Password" id="logpass"/>
                            <img className="input-icon" src="/assets/images/svg/user/lock.svg" alt=""/>
                        </div>
                        <button onClick={e => submitName(e)} type="submit"
                                className="btn mt-4">
                            {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'login'}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
