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
      <div className="grid grid-cols-2 my-14">
        <div className="w-96 h-80 mr-2 mt-28 bg-blue-500">
          <img alt="nice img"/>
        </div>
        <div className="ml-2 p-4 border-4">
          <div className="w-44 ml-[4.5rem] mb-4 text-center">
            <h1 className="text-2xl break-words">create your account</h1>
          </div>
          <form className="ml-6" onSubmit={register}>
            <label>
              <p>First name</p>
              <input className="w-72 mb-2" type="text" onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
              <p>Last name</p>
              <input className="w-72 mb-2" type="text" onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
              <p>Email address</p>
              <input className="w-72 mb-2" type="email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              <p>Username</p>
              <input className="w-72 mb-2" type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input className="w-72 mb-2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="border-4 w-24 mt-4 text-center bg-green-200 hover:bg-purple-200">
              <button type="submit" onClick={register}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
