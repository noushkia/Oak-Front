import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {Fragment, useEffect, useState} from "react";
import Auth from "./auth/Auth";
import NavBar from "./general/navbar/NavBar";
import Footer from "./general/footer/Footer";
import User from "./user/User";
import {getUser} from "./utils/api/Users";
import Home from "./home/Home";
import {getUsername} from "./utils/Session";

function App() {
    const [currUser, setCurrUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const protectedRoutes = (
        <Routes>
            <Route path='/user' element={<User currUser={currUser} setLoggedIn={setLoggedIn}/>}/>
            <Route path='/home' element={<Home buyList={currUser.buyList}/>}/>
            <Route path='/' element={<Navigate to='/home'/>}/>
        </Routes>
    )

    const username = getUsername();
    useEffect(() => {
        if (username !== '') {
            setLoggedIn(true);
            setLoading(true);
            getUser(username)
                .then((currUser) => {
                    setCurrUser(currUser);
                    setLoggedIn(true);
                    setLoading(false);
                })
                .catch((e) => {
                    if (!e.response) toast.error('Connection Error');
                    setLoggedIn(false);
                    setLoading(false);
                });
        }
    }, [username]);

    return (
        <Router>
            <div className="wrapper">
                {
                    loading ?
                        <div className='text-center'><Spinner animation="border" variant='info'/></div>
                        : loggedIn ?
                            <Fragment>
                                <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} currUser={currUser}/>
                                {protectedRoutes}
                                <Footer/>
                            </Fragment>
                            : <Auth setLoggedIn={setLoggedIn}/>
                }
                <ToastContainer position='bottom-right' rtl={true}/>
            </div>
        </Router>
    );
}

export default App;
