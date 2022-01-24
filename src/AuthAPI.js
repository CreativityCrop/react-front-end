import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

import React, { useContext, useEffect } from "react";

export const AuthContext = React.createContext();
const cookies = new Cookies();
const cookieParams = {
  path: '/',
  //expires: ,
  //domain: "creativitycrop.tech",
  secure: false, // in development, for production set to TRUE
  sameSite: "strict"
};


export const MAIN_API_URL = 'http://creativitycrop.tech:8000/api';

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
  if(getToken() != null) {
    if(jwt_decode(getToken()).exp <= Math.round(Date.now() / 1000)) {
      removeToken();
      return;
    }
    //console.log("Making a request to verify token!");
    await axios.get(MAIN_API_URL + "/auth/verify", {
      headers: {
        "Token": getToken(),
        "Content-Type": "application/json"
      }
    }).catch(function (error) {
      if (error.response.status === 401) {
        //console.log("removing the token")
        removeToken();
      } else {
        console.log('Error', error.message);
      }
    });
  }
}

export default function AuthProvider() {
  const [ authContext , setAuthContext ] = useContext(AuthContext);
  useEffect(() => {
      verifyToken().then( () => {
          if(getToken() != null ) {
              setAuthContext("authenticated");
          }
          else {
              setAuthContext("unauthenticated");
          }
      });
      //console.log("Token: " + getToken() + "\nStatus: " + authContext);
  }, [authContext, setAuthContext]);
  return(null);
} 