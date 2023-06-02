import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {Fragment, useEffect, useState} from "react";
import Auth from "./auth/Auth";
import NavBar from "./general/navbar/NavBar";
import Footer from "./general/footer/Footer";
import User from "./user/User";
import Commodity from "./commodity/Commodity";
import Home from "./home/Home";
import {getJWT} from "./utils/Session";
import {getUser} from "./utils/api/Users";
import Provider from "./provider/Provider";
import CallBack from "./auth/CallBack";

function App() {
    const [currUser, setCurrUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const protectedRoutes = (
        <Routes>
            <Route path={`/users`}
                   element={<User currUser={currUser} setLoggedIn={setLoggedIn} setCurrUser={setCurrUser}/>}/>
            <Route path="/commodities/:commodityId"
                   element={<Commodity setCurrUser={setCurrUser} buyList={currUser.buyList}/>}/>
            <Route path="/providers/:providerId"
                   element={<Provider setCurrUser={setCurrUser} buyList={currUser.buyList}/>}/>
            <Route path='/home' element={<Home buyList={currUser.buyList} setCurrUser={setCurrUser}/>}/>
            <Route path='/' element={<Navigate to='/home'/>}/>
        </Routes>
    )

    useEffect(() => {
        if (getJWT() !== null) {
            setLoggedIn(true);
            setLoading(true);
            getUser()
                .then((currUser) => {
                    setCurrUser(currUser);
                    setLoading(false);
                })
                .catch((e) => {
                    if (!e.response) toast.error('Connection Error');
                    setLoggedIn(false);
                    setLoading(false);
                });
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
                                <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} currUser={currUser}/>
                                {protectedRoutes}
                                <Footer/>
                            </Fragment>
                            :
                            <Fragment>
                                <Routes>
                                    <Route path='/login' element={<Auth setLoggedIn={setLoggedIn}/>}></Route>
                                    <Route path='/signup' element={<Auth setLoggedIn={setLoggedIn}/>}></Route>
                                    <Route path='/callback' element={<CallBack setLoggedIn={setLoggedIn}/>}></Route>
                                    <Route path='*' element={<Navigate to='/login'/>}/>
                                </Routes>
                            </Fragment>
                }
                <ToastContainer position='bottom-left'/>
            </div>
        </Router>
    );
}

export default App;
