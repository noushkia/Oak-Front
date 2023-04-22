import "../style.css"
import logo from '../../logo.svg';
import "./navbar.css"

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {getUsername} from "../../utils/Session";


function HomeBar(props) {
    return (
        // todo: dropdown should add filter
        <form className="form-inline search-bar">
            <div className="dropdown">
                <button className="dropbtn">name</button>
                <div className="dropdown-content">
                    <a href="#">name</a>
                    <a href="#">provider name</a>
                    <a href="#">category</a>
                </div>
            </div>
            <input className="search-input" type="search" placeholder="search your product..." aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0 search" type="submit"></button>
            <img className="search" src="../../../public/assets/images/svg/header/search.svg" alt="Search"
                 onClick="document.querySelector('.form-inline button[id=search]').click();"/>
        </form>
    )
}

function NavBar(props) {

    return (
        <nav className="navbar sticky-top navbar-light bg-white justify-content-between">
            <form className="form-inline">
                <img className="baloot-logo" src={logo} alt="Logo"/>
                <a className="baloot-brand">Baloot</a>
            </form>
            <Routes>
                <Route path='/home/' component={HomeBar}/>
            </Routes>
            <form className="form-inline">
                {/*todo: redirect to user*/}
                <a className="text" href="#">{getUsername()}</a>
                <button className="btn cart" type="button"><span>Cart</span><span>4</span></button>
            </form>
        </nav>
    )
}

export default NavBar;
