import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {useState} from "react";
import Auth from "./auth/Auth";

function App() {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const routes = (
        <Routes>
            <Route path='/auth' element={<Auth setLoggedIn={setLoggedIn} setUser={setUser}/>}/>
        </Routes>
    )

    const protectedRoutes = (
        <Routes>
            {/* Add the protected routes here */}
        </Routes>
    )

    return (
        <Router>
            {loading ? <div className='text-center'><Spinner animation="border" variant='info'/></div> :
                loggedIn ? protectedRoutes : routes
            }
            <ToastContainer position='bottom-right' rtl={true}/>
        </Router>
    );
}

export default App;