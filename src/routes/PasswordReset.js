import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import AuthProvider, { MAIN_API_URL, regex_email } from '../AuthAPI';


export default function PasswordReset() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [success, setSuccess] = useState(false);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        if(success) {
            const interval = setInterval(() => setTimer(prevTimer => {
                setTimer(prevTimer - 1);
                if(prevTimer === 1) {
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
            .post(MAIN_API_URL + "/account/password-reset", {
                email: data.email,
            }, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function (response) {
                if(response.status === 200) {
                    setSuccess(true);
                }
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    };

    return(
        <div id="login">
            <AuthProvider />
            <div className="ml-2 p-4 border-4 mt-24">
                <div className=" mb-10 text-center">
                    <h1 className="text-2xl break-words">Reset your forgotten password</h1>
                </div>
                { success ? 
                    <div>
                    <p>Please check your inbox!</p>
                    <p>Redirecting to Login in {timer}.</p>
                    </div> :
                    <form className="ml-6 mr-6" onSubmit={handleSubmit(postPasswordReset)}>
                        <label>
                            <input className="w-72 mb-2" 
                                type="email" placeholder="Email" 
                                {...register("email", {required: true, pattern: regex_email })} />
                            <div id="email-error" className="text-red-500 pb-3">
                            {errors.email?.type === 'pattern' && "Email must be valid."}
                            {errors.email?.type === 'required' && "Email is required."}
                            </div>                        
                        </label>
                        <button className="border-4 mt-4 text-center bg-green-200 hover:bg-purple-200" type="submit">Reset Password</button>
                    </form>
                }
            </div>
        </div>
    );
}