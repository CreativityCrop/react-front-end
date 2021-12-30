import { setToken } from '../AuthAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { sha3_256 } from 'js-sha3';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login = () => {
    if ((username === "") & (password === "")) {
      return;
    } else {
      axios
      .post("http://78.128.16.152:8000/api/auth/login", {
        username: username,
        pass_hash: sha3_256(password)
      })
      .then(function (response) {
        console.log(response.data.access_token, "response.data.access_token");
        if (response.data.access_token) {
          setToken(response.data.access_token);
          navigate("/account");
        }
      })
      .catch(function (error) {
        //console.log(error, "error");
      });
    }
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form className="justify justify-center" onSubmit={login}>
        <label>Input Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <label>Input Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={login} >Submit</button>
      </form>
    </div>
  );
}
