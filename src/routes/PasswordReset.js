import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import AuthProvider, { MAIN_API_URL, regex_email, setToken } from '../AuthAPI';


export default function PasswordReset() {
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const [success, setSuccess] = useState(false);
    const [timer, setTimer] = useState(5);
    const resetToken = query.get("token");

    useEffect(() => {
        if (success) {
            const interval = setInterval(() => setTimer(prevTimer => {
                setTimer(prevTimer - 1);
                if (prevTimer === 1) {
                    navigate("/login");
                }
            }), 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [success, navigate]);

    const postPasswordReset = (data) => {
        axios
            .post(MAIN_API_URL + "/account/request-password-reset", {
                email: data.email,
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    setSuccess(true);
                }
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    };

    const updatePassword = (data) => {
        axios
            .put(MAIN_API_URL + "/account/password-reset", {
                pass_hash: sha3_256(data.password)
            }, {
                headers: {
                    "Token": resetToken,
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    setSuccess(true);
                    setToken(response.data.accessToken);
                }
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    };

    if (resetToken !== undefined && resetToken !== null) {
        return (
            <div id="password-reset">
                <AuthProvider />
                <div className="flex justify-center gap-4 mt-24 mb-10 sm:mt-20">
                    <div id="img" className="w-96 h-82 bg-blue-500 sm:hidden">
                        <img alt="nice img" />
                    </div>
                    <div className="p-4 border-2 sm:w-80">
                        <div className=" mb-10 text-center">
                            <h1 className="text-2xl break-words">Reset your password</h1>
                        </div>
                        {success ?
                            <div className="text-center">
                                <p>Password was changed successfully!</p>
                                <p>Redirecting to Account in {timer}.</p>
                            </div> 
                            :
                            <form className="max-w-max" onSubmit={handleSubmit(updatePassword)}>
                                <label>
                                    <input className="mt-2 w-72"
                                        type="password" placeholder="Password"
                                        {...register("password", { required: true, minLength: 6 })} />
                                    <div id="password-error" className="text-red-500 pb-3">
                                        {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                                        {errors.password?.type === 'required' && "Password is required."}
                                    </div>
                                </label>
                                <label>
                                    <input className="mt-2 w-72"
                                        type="password" placeholder="Confirm password"
                                        {...register("confirmPassword", { required: true, validate: value => value === password.current || "The passwords do not match" })} />
                                    <div id="password-error" className="text-red-500 pb-3">
                                        {errors.password?.type === 'required' && "Confirm password is required."}
                                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                                    </div>
                                </label>
                                <div className="text-center mt-8">
                                    <button className="border-4 text-center bg-green-200 hover:bg-purple-200" type="submit">Save Password</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="password-reset">
                <AuthProvider />
                <div className="flex justify-center gap-4 mt-24 mb-10 sm:mt-20">
                    <div id="img" className="w-96 h-82 bg-blue-500 sm:hidden">
                        <img alt="nice img" />
                    </div>
                    <div className="p-4 border-2 sm:w-80">
                        <div className=" mb-10 text-center">
                            <h1 className="text-2xl break-words">Reset your password</h1>
                        </div>
                    {success ?
                        <div className="text-center">
                            <p>Please check your inbox!</p>
                            <p>Redirecting to Login in {timer}.</p>
                        </div> :
                        <form className="max-w-max" onSubmit={handleSubmit(postPasswordReset)}>
                            <label>
                                <input className="w-72 mb-2"
                                    type="email" placeholder="Email"
                                    {...register("email", { required: true, pattern: regex_email })} />
                                <div id="email-error" className="text-red-500 pb-3">
                                    {errors.email?.type === 'pattern' && "Email must be valid."}
                                    {errors.email?.type === 'required' && "Email is required."}
                                </div>
                            </label>
                            <div className="text-center mt-8">
                                <button className="border-4 mt-4 text-center bg-green-200 hover:bg-purple-200" type="submit">Reset Password</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}