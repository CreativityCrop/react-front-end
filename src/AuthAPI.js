import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

// IMPORTANT IMPORTANT IMPORTANT 
// SET TO TRUE IF MAKING A BUILD
const IS_PRODUCTION = true;


// when running on a local server, the api url needs to be specified, 
// when running on the actual host it is automatically fetched
export const MAIN_API_URL = IS_PRODUCTION ? '/api' : 'http://creativitycrop.tech/api';

// creating intercomponent context for the authentication status
export const AuthContext = React.createContext();

// library for creating cookies
const cookies = new Cookies();
const cookieParams = {
    path: '/',
    domain: IS_PRODUCTION && "creativitycrop.tech",
    secure: IS_PRODUCTION, // in development, for production set to TRUE
    sameSite: "strict"
};

export const setToken = (token) => {
    //localStorage.setItem("access_token", token);
    cookies.set('accessToken', token, cookieParams);
};

export const getToken = () => {
    //return localStorage.getItem("access_token");
    return cookies.get('accessToken');
};

export const removeToken = (reason) => {
    //return localStorage.removeItem("access_token");
    if(reason === "expired") {
        toast.info("Your session has expired!");
    }
    return cookies.remove('accessToken', cookieParams);
}

export const verifyToken = async () => {
    // first check if there is any token
    if (getToken() != null) {
        // then check if it has expired
        if (jwt_decode(getToken()).exp <= Math.round(Date.now() / 1000)) {
            toast.info("Your session has expired!")
            removeToken();
            return "deauthenticated";
        }
        // finally verify it at api
        await axios
        .get(MAIN_API_URL + "/auth/verify", {
            headers: {
                "Token": getToken(),
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        })
        .catch(function (error) {
            if (error.response?.status === 401) {
                removeToken("expired");
                return "deauthenticated"
            }
            // else {
            //     console.log('Error', error.message);
            // }
        });
    }
}

// Dummy component for regular checks of token validity, while browsing routes
export default function AuthProvider() {
    const [, setAuthContext] = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        verifyToken().then((result) => { 
            if (getToken() != null) {
                setAuthContext("authenticated");
            }
            else {
                setAuthContext("unauthenticated");
                if(result==="deauthenticated") {
                    localStorage.setItem("redirect-back", location.pathname);
                    navigate("/");
                }
            }
        });
    }, [location, setAuthContext, navigate]);

    return(null);
}

// regular expressions used to validate forms
export const regex_name = /^[a-zA-Z ,.'-]+$/i;
export const regex_user = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
export const regex_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;