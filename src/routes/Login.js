import { useState} from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import { setToken, MAIN_API_URL } from '../AuthAPI';

export default function Login() {
  const navigate = useNavigate();
  const navigateBack = localStorage.getItem("redirect-back");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login = () => {
    if ((username === "") & (password === "")) {
      return;
    } else {
      axios
      .post(MAIN_API_URL + "/auth/login", {
        username: username,
        pass_hash: sha3_256(password)
      })
      .then(function (response) {
        //console.log(response.data.access_token, "response.data.access_token");
        if (response.data.access_token) {
          setToken(response.data.access_token);
          if(navigateBack) {
            localStorage.removeItem("redirect-back");
            navigate(navigateBack);
          }
          else {
            navigate("/account");
          }
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      });
    }
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form className="justify justify-center" onSubmit={login}>
        <label>
          <p>Input Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Input Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="button" onClick={login} >Submit</button>
        </div>
      </form>
    </div>
  );
}
