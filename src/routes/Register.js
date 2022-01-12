import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import AuthProvider, { setToken, MAIN_API_URL } from '../AuthAPI';

export default function Register() {
  const navigate = useNavigate();
  const navigateBack = localStorage.getItem("redirect-back");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const isFormValid = () => {
      return true;
  }

  const register = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    } else {
      axios
        .post(MAIN_API_URL + "/auth/register", {
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username,
          pass_hash: sha3_256(password)
        })
        .then(function (response) {
          //console.log(response.data.accessToken, "response.data.accessToken");
          if (response.data.accessToken) {
            setToken(response.data.accessToken);
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
  };

  return (
    <div>
      <AuthProvider/>
      <h1>Register</h1>
      <div className="flex flex-row">
        <div>
          <img alt="nice img"/>
        </div>
        <div>
          <form className="justify justify-center" onSubmit={register}>
            <label>
              <p>First name</p>
              <input type="text" onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
              <p>Last name</p>
              <input type="text" onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
              <p>Email address</p>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              <p>Username</p>
              <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit" onClick={register}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
