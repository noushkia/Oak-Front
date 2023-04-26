import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {Fragment, useEffect, useState} from "react";
import Auth from "./auth/Auth";
import NavBar from "./general/navbar/NavBar";
import Footer from "./general/footer/Footer";
import User from "./user/User";
import {getUser} from "./utils/api/Users";

function App() {
    const [user, setUser] = useState({});
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const protectedRoutes = (
        <Routes>
            <Route path='/user' element={<User user={user}/>}/>
            <Route path='/home' element={<Home user={user}/>}/>
        </Routes>
    )

    useEffect(() => {
        if (username !== "") {
            console.log(username)
            setLoggedIn(true);
            setLoading(true);
            getUser(username)
                .then(currUser => {
                    setUser(currUser);
                    setLoggedIn(true);
                    setLoading(false);
                })
                .catch(e => {
                    if (!e.response)
                        toast.error('Connection Error');
                    setLoggedIn(false);
                    setLoading(false);
                })
        }
    }, []);

    return (
        <Router>
            <div className="wrapper">
                {
                    loading ?
                        <div className='text-center'><Spinner animation="border" variant='info'/></div>
                        : loggedIn ?
                            <Fragment>
                                <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                                {protectedRoutes}
                                <Footer/>
                            </Fragment>
                            : <Auth setLoggedIn={setLoggedIn} setUsername={setUsername}/>
                }
                <ToastContainer position='bottom-right' rtl={true}/>
            </div>
        </Router>
    );
}

export default App;
