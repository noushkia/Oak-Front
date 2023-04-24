import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import Auth from "./auth/Auth";
import NavBar from "./general/navbar/NavBar";
import Footer from "./general/footer/Footer";
import User from "./user/User";
import {getUsername} from "./utils/Session";
import {getUser} from "./utils/api/Users";

function App() {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({}); // Use cart to show the number of items in cart in the buttons
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const protectedRoutes = (
        <Routes>
            <Route path='/user' children={<User user={user}/>}/>
        </Routes>
    )

    useEffect(() => {
        if (getUsername() != null) {
            setLoggedIn(true);
            setLoading(true);
            getUser(getUsername())
                .then(currUser => {
                    setUser(currUser);
                    // todo: setCart();
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
                <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                {
                    loading ? <div className='text-center'><Spinner animation="border" variant='info'/></div> :
                        loggedIn ? protectedRoutes : <Auth setLoggedIn={setLoggedIn} setUser={setUser}/>
                }
                <ToastContainer position='bottom-right' rtl={true}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
