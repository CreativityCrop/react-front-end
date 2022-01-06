import { useState} from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import { setToken, MAIN_API_URL } from '../AuthAPI';
import AuthProvider from '../AuthProvider';


export default function Login() {
  const navigate = useNavigate();
  const navigateBack = localStorage.getItem("redirect-back");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const isFormValid = () => {
    return true;
  }

  const login = (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    } else {
      axios
      .post(MAIN_API_URL + "/auth/login", {
        username: username,
        pass_hash: sha3_256(password)
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
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
    <div id="login">
      <AuthProvider/>
      <h1>Login</h1>
      <div className="flex flex-row">
        <div className="basis-7/12 bg-blue-500">
          <img alt="nice img"/>
        </div>
        <div className="basis-5/12">
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
              <button type="submit" >Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
