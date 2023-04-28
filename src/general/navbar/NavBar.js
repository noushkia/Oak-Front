import logo from '../../logo.svg';
import "../style.css"
import "./dropdown.css"
import "./navbar.css"

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

    const handleDropdownClick = (selectedType, event) => {
        event.preventDefault();
        setType(selectedType);
    }

    return (
        <form className="form-inline search-bar d-flex">
            <div className="dropdown">
                <button className="dropbtn" onClick={(event) => {
                    event.preventDefault();
                }}>{type || "Select type"}</button>
                <div className="dropdown-content">
                    <button onClick={(event) => handleDropdownClick("name", event)}>name</button>
                    <button onClick={(event) => handleDropdownClick("category", event)}>category</button>
                    <button onClick={(event) => handleDropdownClick("provider", event)}>provider</button>
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
        </form>
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
            <Link className="form-inline" to={"/home"} style={{textDecoration: 'none'}}>
                <Image className="baloot-logo" src={logo} alt="Logo"/>
                <span className="baloot-brand">Baloot</span>
            </Link>
            {location.pathname === "/home" && <SearchBar/>}
            <Form className="form-inline">
                <Link className="text" to={`/users/${props.currUser.username}`}>
                    #{props.currUser.username}
                </Link>
                <Button className="btn cart" type="button" onClick={handleCartClick}>
                    <span>Cart</span>
                    <span>{Object.keys(props.currUser.buyList.items).length}</span>
                </Button>
            </Form>
        </Nav>
    )
}

export default NavBar;
