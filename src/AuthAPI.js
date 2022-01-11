import axios from 'axios';
import Cookies from 'universal-cookie';
import React from "react";

export const AuthContext = React.createContext();
const cookies = new Cookies();

export const MAIN_API_URL = 'http://creativitycrop.tech:8000/api';

export const setToken = (token) => {
  //localStorage.setItem("access_token", token);
  cookies.set('accessToken', token, { path: '/' });
};

export const getToken = () => {
  //return localStorage.getItem("access_token");
  return cookies.get('accessToken');
};

export const removeToken = () => {
  //return localStorage.removeItem("access_token");
  return cookies.remove('accessToken', { path: '/' });
}

export const verifyToken = async () => {
  //console.log("Checking token");
  if(getToken() != null) {
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
