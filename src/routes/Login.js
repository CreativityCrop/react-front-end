import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import AuthProvider, { setToken, MAIN_API_URL, regex_user } from '../AuthAPI';


export default function Login() {
    const navigate = useNavigate();
    const navigateBack = localStorage.getItem("redirect-back");
    const { register, formState: { errors }, handleSubmit } = useForm();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if(query.get("email_verified")) {
            toast.success("Email is verified! You can login now.")
        }
    });
    
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
                    if (navigateBack) {
                        localStorage.removeItem("redirect-back");
                        navigate(navigateBack);
                    }
                    else {
                        toast.success("Successful login!", {autoClose: 1000})
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
                }
                else {
                    // anything else
                }
            });
    }

    return (
        <div id="login">
            <AuthProvider />
            <div className="flex justify-center gap-4 mt-28 mb-24 sm:mt-20">
                <div id="img" className="w-96 h-82 bg-slate-300 sm:hidden">
                    <img alt="nice img" />
                </div>
                <div id="form" className="p-4 sm:w-80 bg-yankeesblue">
                    <div className="w-full mb-4 text-center">
                        <h1 className="text-2xl break-words sm:text-xl text-slate-300">Log in to your account</h1>
                    </div>
                    <form className="max-w-max" onSubmit={handleSubmit(postLogin)}>
                        <label>
                            <input className="mt-6 w-72" 
                                type="text" placeholder="Username"
                                autoComplete="on"
                                {...register("username", { required: true, minLength: 4, maxLength: 18, pattern: regex_user })} />
                            <div id="username-error" className="text-red-500 pb-3">
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
                            <div id="password-error" className="text-red-500 pb-1">
                            {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                            {errors.password?.type === 'required' && "Password is required."}
                            </div>
                        </label>
                        <Link to="/password-reset" className='text-slate-300' >Can't remember you password?</Link>
                        <br/>
                        <div className="mt-4">
                            <button className="w-24 mb-2 py-1 text-center bg-jasmine hover:bg-purple-200
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
