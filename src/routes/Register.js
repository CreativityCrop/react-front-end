import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

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
            <div className="flex justify-center items-center gap-4 sm:gap-0 mt-24 mb-10 sm:mt-20">
                <div id="image" className="w-96 h-80 bg-blue-500 sm:hidden">
                    <img alt="nice img" />
                </div>
                <div id="form" className="sm:w-80 sm:p-4 p-6 border-2 ">
                    <div className="w-full mt-6 mb-4 text-center">
                        <h1 className="text-2xl break-words sm:text-xl">Create your account</h1>
                    </div>
                    <form className="max-w-max" onSubmit={handleSubmit(postUser)}>
                        <label>
                            <input className="mt-6 w-72 mb-2" 
                                type="text" placeholder="First name"
                                autocomplete="on"
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
                                autocomplete="on"
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
                                autocomplete="on"
                                {...register("email", {required: true, pattern: regex_email })} />
                            <div id="email-error" className="text-red-500 pb-3">
                            {errors.email?.type === 'pattern' && "Email must be valid."}
                            {errors.email?.type === 'required' && "Email is required."}
                            </div>                        
                        </label>
                        <label>
                            <input className="w-72 mb-2" 
                                type="text" placeholder="Username"
                                autocomplete="on"
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
                                type="password" placeholder="Password"
                                autocomplete="off"
                                {...register("password", {required: true, minLength: 6})} />
                            <div id="password-error" className="text-red-500 pb-3">
                            {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                            {errors.password?.type === 'required' && "Password is required."}
                            </div>
                        </label>
                        <div className="text-center ">
                            <button className="border-2 w-24 mb-2 text-center bg-green-200 hover:bg-purple-200" type="submit">Register</button>
                            <br/>
                            <Link to="/login">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
