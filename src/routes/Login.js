import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import AuthProvider, { setToken, MAIN_API_URL, regex_user } from '../AuthAPI';


export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const navigateBack = localStorage.getItem("redirect-back");
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if(query.get("email_verified")) {
            toast.success("Email is verified! You can login now.");
        }
    }, [location]);
    
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
            .then((response) => {
                //console.log(response.data.accessToken, "response.data.accessToken");
                if (response.data.accessToken) {
                    setToken(response.data.accessToken);
                    toast.success("Successful login!", {autoClose: 1000})
                    if (navigateBack) {
                        localStorage.removeItem("redirect-back");
                        navigate(navigateBack);
                    }
                    else {
                        navigate("/account");
                    }
                }
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.error("Unknown error! Please try again.");
                }
            });
    }

    return (
        <div id="login">
            <AuthProvider />
            <div className="flex justify-center gap-6 mt-28 mb-20">
                <div id="img" className="w-96 flex items-center sm:hidden overflow-hidden">
                    <img alt="nice img" src="./assets/Illustrations/1.png" className="scale-150"/>
                </div>
                <div id="form" className="sm:p-4 p-6 sm:w-80 bg-yankeesblue">
                    <div className="w-full mb-4 text-center">
                        <h1 className="text-2xl break-words sm:text-xl text-slate-300">Log in to your account</h1>
                    </div>
                    <form className="max-w-max" onSubmit={handleSubmit(postLogin)}>
                        <label>
                            <input className="mt-6 w-72" 
                                type="text" placeholder="Username"
                                autoComplete="on"
                                {...register("username", { required: true, minLength: 4, maxLength: 18, pattern: regex_user })} />
                            <div id="username-error" className="text-red-500 w-72 pb-3 break-words">
                            {errors.username?.type === 'minLength' && "Username must be at least 4 characters."}
                            {errors.username?.type === 'maxLength' && "Username must be at most 18 characters."}
                            {errors.username?.type === 'pattern' && "Username can only include letters and [,.'-]."}
                            {errors.username?.type === 'required' && "Username is required."}
                            </div>
                        </label>
                        <label>
                            <input className="mt-1 w-72"
                                type="password" placeholder="Password" 
                                autoComplete="on"
                                {...register("password", {required: true, minLength: 6})} />
                            <div id="password-error" className="text-red-500 w-72 pb-1 break-words">
                            {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                            {errors.password?.type === 'required' && "Password is required."}
                            </div>
                        </label>
                        <Link to="/password-reset" className='text-slate-300' >Can't remember you password?</Link>
                        <br/>
                        <div className="mt-4">
                            <button className="w-24 mb-2 py-1 text-center bg-jasmine hover:bg-amber-500
                            hover:scale-105 hover:origin-bottom hover:rotate-3 hover:drop-shadow-xl transition duration-150" type="submit">Log in</button>
                            <br/>
                            <Link to="/register" className='text-slate-300'>Don't have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
