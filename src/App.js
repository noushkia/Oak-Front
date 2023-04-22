import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from "react";
import {Route, Routes} from 'react-router-dom';
import Login from './auth/login/Login';
import {ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";

function App() {
    const [user, setUser] = useState({}); // todo: implement
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const loggedOutRoutes = (
        <Routes>
            <Route path='/login' children={<Login/>}/>
        </Routes>
    )

    const routes = (
        <Routes>
        </Routes>
    )

    return (
        <div className="App">
            <div className="wrapper">
                {loading ? <div className='text-center'> <Spinner animation="border" variant='info' /> </div> :
                    loggedIn ? routes : loggedOutRoutes
                }
            </div>
            <ToastContainer position='bottom-right' rtl={true} />
        </div>
    );
}

export default App;
