import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

//DEV
export const MAIN_API_URL = 'http://creativitycrop.tech/api';
//PROD
//export const MAIN_API_URL = '/api';

export const AuthContext = React.createContext();

const cookies = new Cookies();
const cookieParams = {
    path: '/',
    //expires: ,
    //domain: "creativitycrop.tech",
    secure: false, // in development, for production set to TRUE
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

export const removeToken = () => {
    //return localStorage.removeItem("access_token");
    return cookies.remove('accessToken', cookieParams);
}

export const verifyToken = async () => {
    //console.log("Checking token");
    if (getToken() != null) {
        if (jwt_decode(getToken()).exp <= Math.round(Date.now() / 1000)) {
            toast.info("Your session has expired!")
            removeToken();
            return "deauthenticated";
        }
        //console.log("Making a request to verify token!");
        await axios.get(MAIN_API_URL + "/auth/verify", {
            headers: {
                "Token": getToken(),
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).catch(function (error) {
            if (error.response.status === 401) {
                // console.log("removing the token");
                removeToken();
                return "deauthenticated"
            } else {
                console.log('Error', error.message);
            }
        });
    }
}

// export default function AuthProvider() {
//     const [authContext, setAuthContext] = useContext(AuthContext);
//     useEffect(() => {
//         verifyToken().then(() => {
//             if (getToken() != null) {
//                 setAuthContext("authenticated");
//             }
//             else {
//                 setAuthContext("unauthenticated");
//             }
//         });
//         //console.log("Token: " + getToken() + "\nStatus: " + authContext);
//     }, [authContext, setAuthContext]);
//     return(<TokenProvider/>);
// }

export default function AuthProvider() {
    const [, setAuthContext] = useContext(AuthContext);
    let location = useLocation();
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
                    navigate("/login");
                }
            }
        });
    }, [location, setAuthContext, navigate]);

    return(null);
}

export const regex_name = /^[a-zA-Z ,.'-]+$/i;
export const regex_user = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i;
export const regex_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;