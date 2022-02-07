import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import AuthProvider, { MAIN_API_URL, regex_user, regex_name, regex_email } from '../AuthAPI';

export default function Register() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const postUser = (data) => {
        axios
            .post(MAIN_API_URL + "/auth/register", {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                username: data.username,
                pass_hash: sha3_256(data.password)
            })
            .then(function (response) {
                //console.log(response.data.accessToken, "response.data.accessToken");
                if (response.status === 200) {
                    navigate("/login");
                }
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    };

    return (
        <div>
            <AuthProvider />
            <div className="grid grid-cols-2 my-6">
                <div id="image" className="w-96 h-80 mr-2 mt-28 bg-blue-500">
                    <img alt="nice img" />
                </div>
                <div id="form" className="ml-2 p-4 border-4">
                    <div className="w-44 ml-[4.5rem] mb-4 text-center">
                        <h1 className="text-2xl break-words">create your account</h1>
                    </div>
                    <form className="ml-6" onSubmit={handleSubmit(postUser)}>
                        <label>
                            <input className="mt-6 w-72 mb-2" 
                                type="text" placeholder="First name" 
                                {...register("firstName", {required: true, minLength: 2, maxLength: 30, pattern: regex_name })} />
                            <div id="first-name-error" className="text-red-500 pb-3">
                            {errors.firstName?.type === 'minLength' && "First name must be at least 2 characters."}
                            {errors.firstName?.type === 'maxLength' && "First name must be at most 30 characters."}
                            {errors.firstName?.type === 'pattern' && "First name can only include letters and [,.'-]."}
                            {errors.firstName?.type === 'required' && "First name is required."}
                            </div>
                        </label>
                        <label>
                            <input className="w-72 mb-2" 
                                type="text" placeholder="Last name" 
                                {...register("lastName", {required: true, minLength: 2, maxLength: 30, pattern: regex_name })} />
                            <div id="last-name-error" className="text-red-500 pb-3">
                            {errors.lastName?.type === 'minLength' && "Last name must be at least 2 characters."}
                            {errors.lastName?.type === 'maxLength' && "Last name must be at most 30 characters."}
                            {errors.lastName?.type === 'pattern' && "Last name can only include letters and [,.'-]."}
                            {errors.lastName?.type === 'required' && "Last name is required."}
                            </div>
                        </label>
                        <label>
                            <input className="w-72 mb-2" 
                                type="email" placeholder="Email" 
                                {...register("email", {required: true, pattern: regex_email })} />
                            <div id="email-error" className="text-red-500 pb-3">
                            {errors.email?.type === 'pattern' && "Email must be valid."}
                            {errors.email?.type === 'required' && "Email is required."}
                            </div>                        
                        </label>
                        <label>
                            <input className="w-72 mb-2" 
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
                            <input className="w-72 mb-2"
                                type="password" placeholder="Password" {...register("password", {required: true, minLength: 6})} />
                            <div id="password-error" className="text-red-500 pb-3">
                            {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                            {errors.password?.type === 'required' && "Password is required."}
                            </div>
                        </label>
                        <div>
                            <button className="border-4 w-24 mt-4 text-center bg-green-200 hover:bg-purple-200" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
