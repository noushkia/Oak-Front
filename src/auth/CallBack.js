import React, {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {getJWT, saveJWT} from "../utils/Session";

function CallBack({ setLoggedIn}) {
    console.log("callback")
    const navigate = useNavigate();
    const [fetched, setFetched] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    async function doFetch(code) {
        setFetched(true);
        await fetch('http://localhost:8080/callback', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({"code": code})
        }).then(resp => {
            if (resp.status === 200) {
                console.log("login with github successful!")
                setFetched(false);
                saveJWT(resp.data)
                navigate("/home")
            } else {
                console.log("login using github failed!")
                setFetched(false);
                navigate("/login")
            }
        });
    }

    useEffect(() => {
        if (getJWT() === null) {
            setLoggedIn(false)
        } else {
            console.log("You can't view this page when logged in")
            navigate('/home')
        }
        let auth_code = searchParams.get("code")
        if (auth_code == null) {
            console.log("There was a problem!")
            navigate("/login")
        }
        if (!fetched) {
            doFetch(auth_code).then(_ => {
            })
        }
    }, )

    return (
        <></>
    );
}

export default CallBack;