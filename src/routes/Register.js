import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { isValid } from 'iban';
import { toast } from 'react-toastify';

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
                iban: data.iban.split(' ').join(''),
                username: data.username,
                pass_hash: sha3_256(data.password)
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Great! Now check your inbox for verification email!")
                    navigate("/login");
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }
            });
    };

    const isIbanValid = (value) => {
        return isValid(value);
    };
    
    return (
        <div>
            <AuthProvider/>
            <div className="flex justify-center items-center gap-4 sm:gap-0 mt-16 mb-10 sm:mt-20">
                <div id="image" className="w-96 h-80 bg-slate-300 sm:hidden">
                    <img alt="nice img" />
                </div>
                <div id="form" className="sm:w-80 sm:p-4 p-6 max-w-min bg-maxbluepurple">
                    <div className="w-full mb-4 text-center">
                        <h1 className="text-2xl break-words sm:text-xl">Create your account</h1>
                    </div>
                    <form className="" onSubmit={handleSubmit(postUser)}>
                        <label>
                            <input className="mt-6 w-72 mb-2" 
                                type="text" placeholder="First name"
                                autoComplete="on"
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
                                autoComplete="on"
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
                                autoComplete="on"
                                {...register("email", {required: true, pattern: regex_email })} />
                            <div id="email-error" className="text-red-500 pb-3">
                            {errors.email?.type === 'pattern' && "Email must be valid."}
                            {errors.email?.type === 'required' && "Email is required."}
                            </div>                        
                        </label>

                        {/* IBAN */}
                        <label>
                            <input className="w-72 mb-2" 
                                type="text" placeholder="IBAN"
                                autoComplete="on"
                                {...register("iban", {required: true, validate: isIbanValid})} />
                            <div id="iban-error" className="text-red-500 pb-3">
                            {errors.iban?.type === "validate" && "IBAN must be valid."}
                            {errors.iban?.type === 'required' && "IBAN is required."}
                            </div>                        
                        </label>

                        <label>
                            <input className="w-72 mb-2" 
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
                            <input className="w-72 mb-2"
                                type="password" placeholder="Password"
                                autoComplete="off"
                                {...register("password", {required: true, minLength: 6})} />
                            <div id="password-error" className="text-red-500 pb-3">
                            {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                            {errors.password?.type === 'required' && "Password is required."}
                            </div>
                        </label>
                        <p>
                            By clicking register you agree to the <Link className="text-jasmine hover:text-purple-600" to="/terms-conditions" target="_blank">Terms and Conditions</Link>
                        </p>
                        <div>
                            <button className="w-24 mt-4 mb-2 py-1 text-center bg-jasmine hover:bg-purple-200 
                            hover:scale-105 hover:origin-bottom hover:-rotate-3 hover:drop-shadow-xl transition duration-150" type="submit">Register</button>
                            <br/>
                            <Link to="/login">Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
