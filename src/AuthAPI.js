import axios from 'axios';

export const MAIN_API_URL = 'http://creativitycrop.tech:8000/api';

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const removeToken = () => {
  return localStorage.removeItem("access_token");
}

export const verifyToken = async () => {
  await axios.get(MAIN_API_URL + "/auth/verify", {
    headers: {
      "Token": getToken(),
      "Content-Type": "application/json"
    }
  }).catch(function (error) {
    if (error.response.status === 401) {
      console.log(error.response.data);
    } else {
      console.log('Error', error.message);
    }
  });
}
