export const MAIN_API_URL = 'http://creativitycrop.tech:8000/api';

export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const removeToken= () => {
  return localStorage.removeItem("access_token");
}

