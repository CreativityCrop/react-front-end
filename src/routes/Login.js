import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import AuthProvider, { setToken, MAIN_API_URL, regex_user } from '../AuthAPI';


export default function Login() {
    const navigate = useNavigate();
    const navigateBack = localStorage.getItem("redirect-back");
    const { register, formState: { errors }, handleSubmit } = useForm();

    
    const postLogin = (data) => {
        axios
            .post(MAIN_API_URL + "/auth/login", {
                username: data.username,
                pass_hash: sha3_256(data.password)
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function (response) {
                //console.log(response.data.accessToken, "response.data.accessToken");
                if (response.data.accessToken) {
                    setToken(response.data.accessToken);
                    if (navigateBack) {
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

    return (
        <div id="login">
            <AuthProvider />
            <div className="grid grid-cols-2 mt-24 mb-10">
                <div className="w-96 h-82 mr-2 bg-blue-500">
                    <img alt="nice img" />
                </div>
                <div className="ml-2 p-4 border-4">
                    <div className="w-44 ml-[4.5rem] mb-4 text-center">
                        <h1 className="text-2xl break-words">Log in to your account</h1>
                    </div>
                    <form className="ml-6" onSubmit={handleSubmit(postLogin)}>
                        <label>
                            <p>Username</p>
                            <input className="w-72" 
                                type="text" placeholder="Username" 
                                {...register("username", { required: true, minLength: 4, maxLength: 18, pattern: regex_user })} />
                            <div id="username-error" className="text-red-500 pb-3">
                            {errors.username?.type === 'minLength' && "Username must be at least 4 characters."}
                            {errors.username?.type === 'maxLength' && "Username must be at most 18 characters."}
                            {errors.username?.type === 'pattern' && "Username can only include letters and [,.'-]."}
                            {errors.username?.type === 'required' && "Username is required."}
                            </div>
                        </label>
                        <label>
                        <p>Password</p>
                            <input className="w-72"
                                type="password" placeholder="Password" 
                                {...register("password", {required: true, minLength: 6})} />
                            <div id="password-error" className="text-red-500 pb-3">
                            {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                            {errors.password?.type === 'required' && "Password is required."}
                            </div>
                        </label>
                        <div>
                            <button className="border-4 w-24 mt-4 text-center bg-green-200 hover:bg-purple-200" type="submit">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
