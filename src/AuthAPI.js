export const setToken = (token) => {
  localStorage.setItem("access_token", token);
};

export const fetchToken = (token) => {
  return localStorage.getItem("access_token");
};

