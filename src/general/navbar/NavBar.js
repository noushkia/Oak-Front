import logo from '../../logo.svg';
import "../style.css"
import "./navbar.css"
import "./dropdown.css"

import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Button, Form, Image, Nav} from "react-bootstrap";


function SearchBar() {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [query, setQuery] = useState("");

    const handleSearchSubmit = () => {
        navigate(`/home?query=${query}&type=${type}`);
    }

    const handleDropdownClick = (selectedType) => {
        setType(selectedType);
    }

    return (
        <Form className="form-inline search-bar">
            <div className="dropdown">
                <Button className="dropbtn">{type || "Select type"}</Button>
                <div className="dropdown-content">
                    <a href="#" onClick={() => handleDropdownClick("name")}>name</a>
                    <a href="#" onClick={() => handleDropdownClick("category")}>category</a>
                    <a href="#" onClick={() => handleDropdownClick("provider")}>provider</a>
                </div>
            </div>
            <input
                className="search-input"
                type="search"
                placeholder="search your product..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Image className="search" src="../../assets/images/svg/header/search.svg" alt="Search"
                   onClick={handleSearchSubmit}/>
        </Form>
    )
}

function NavBar(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCartClick = () => {
        navigate(`/users/${props.currUser.username}`);
    }

    return (
        <Nav className="navbar sticky-top navbar-light bg-white justify-content-between">
            <Link className="form-inline" to="/home">
                <Image className="baloot-logo" src={logo} alt="Logo"/>
                <span className="baloot-brand">Baloot</span>
            </Link>
            {location.pathname === "/home" && <SearchBar/>}
            <Form className="form-inline">
                <Link className="text" to={`/users/${props.currUser.username}`}>
                    #{props.currUser.username}
                </Link>
                <Button className="btn cart" type="button"
                        onClick={handleCartClick}><span>Cart</span><span>{props.currUser.buyList.items.length}</span></Button>
            </Form>
        </Nav>
    )
}

export default NavBar;
