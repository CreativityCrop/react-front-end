import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import axios from 'axios';
import { sha3_256 } from 'js-sha3';
import { isValid } from 'iban';


import { MAIN_API_URL, AuthContext, setToken, getToken, removeToken, regex_user, regex_email } from '../AuthAPI';

import { ReactComponent as UploadIcon } from '../assets/icons/upload-image.svg'

export default function AccountSettings(props) {
    const [, setAuthContext] = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);    // var to determine if settings are in edit mode
    const [imgVisual, setImgVisual] = useState(null);   // helper var to visualize avatar
    const { register, formState: { errors }, handleSubmit } = useForm();    // react-hook-form used for validation

    const updateUser = (data) => {
        const formData = new FormData();
        // checks which fields have been altered
        if (data.avatar.length !== 0) {
            formData.append("avatar", data.avatar[0], data.avatar[0]?.name);
        }
        if (data.username !== undefined) {
            formData.append("username", data.username);
        }
        if (data.email !== undefined) {
            formData.append("email", data.email);
        }
        if (data.iban !== undefined) {
            formData.append("iban", data.iban);
        }
        if (data.password !== undefined) {
            formData.append("pass_hash", sha3_256(data.password));
        }
        if (formData.entries().next().done) {    // if formData is empty don't send a request
            return;
        }
        axios
            .put(MAIN_API_URL + "/account", formData, {
                headers: {
                    "Token": getToken(),
                    "Content-type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"

                }
            }).then((response) => {
                if (response.data.accessToken !== undefined) {   // if username has been changed we need a new token
                    setToken(response.data.accessToken);
                }
                window.location.reload(false);      // refresh page just in case
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }

            });
        setImgVisual(null);     // reset the image visualizer
    };

    const handleImageChange = (e) => {    // Function to visualise the uploaded Image
        if (e.target.files.length === 0) return;
        if (["png", "jpg", "jpeg"].indexOf(e.target.files[0].name.match(/\.[0-9a-z]+$/i)[0].replace(".", "")) === -1) {
            alert("Filetype not allowed!");
            return;
        }
        //console.log("picture: ", e.target.files);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgVisual(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }

    const isIbanValid = (value) => {
        if (value === undefined) return true;
        return isValid(value);
    };

    return(
        <div id="holder-of-the-acc" className="sm:ml-[7%]">
            <div id="pfp-and-options" className="flex flex-row mb-5 ">
                {editMode ?
                    <div id="image" className="mr-4 flex flex-col flex-none">
                        <div className="w-48 h-48 bg-slate-200 cursor-pointer mr-1 md:mr-1 sm:w-36 sm:h-36 sm:mr-[0.4rem]"
                            style={
                                {
                                    bacgroundColor: 'none',
                                    backgroundImage: `url(${imgVisual})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center"
                                }
                            }
                            onClick={(e) => document.getElementById("select-image").click()}
                        >
                            <UploadIcon className="w-1/2 top-1/2 left-1/2 ml-12 mt-11 cursor-pointer sm:ml-10 sm:mt-8"/>
                        </div>
                        <input
                            id="select-image"
                            {...register("avatar", { onChange: (e) => handleImageChange(e) })}
                            hidden type="file"
                        />
                        <div id="image-error" className="break-words text-red-500">
                            {/* {errors.image?.type === 'required' && "Cover image is reqiured."} */}
                        </div>
                    </div>
                    :
                    <div id="left" className="w-48 h-48 mr-5 bg-slate-300 sm:w-[13.6rem] sm:h-36">
                        <img src={props.avatarUrl} alt="user avatar" />
                    </div>
                }

                <form className="" onSubmit={handleSubmit(updateUser)}>
                    <div id="middle" className="">
                        <div>
                            <div>
                                <input
                                    {...register("username", { minLength: 4, maxLength: 18, pattern: regex_user })}
                                    type="text"
                                    className="text-lg w-64 h-10 p-1 sm:w-44 sm:text-clip"
                                    placeholder="Change Username"
                                    defaultValue={props.userData.username}
                                    disabled={!editMode}
                                />
                                <div id="username-error" className="text-red-500">
                                    {errors.username?.type === 'minLength' && "Username must be at least 4 characters."}
                                    {errors.username?.type === 'maxLength' && "Username must be at most 18 characters."}
                                </div>
                                <input
                                    {...register("email", { pattern: regex_email })}
                                    type="email"
                                    className="w-64 h-10 p-1 mt-3 sm:w-44 sm:text-clip"
                                    placeholder="Change Email"
                                    defaultValue={props.userData.email}
                                    disabled={!editMode}
                                />
                                <div id="title-error" className="text-red-500">
                                    {errors.email?.type === 'pattern' && "Email must be valid."}
                                </div>
                                {/* IBAN */}
                                <input
                                    type="text"
                                    className="w-64 h-10 p-1 mt-3 sm:w-44 sm:text-clip"
                                    placeholder="IBAN"
                                    defaultValue={props.userData.iban}
                                    disabled={!editMode}
                                    {...register("iban", { validate: isIbanValid })} />
                                <div id="iban-error" className="text-red-500">
                                    {errors.iban?.type === "validate" && "IBAN must be valid."}
                                </div>

                                <input
                                    {...register("password", { minLength: 6 })}
                                    type="password"
                                    className="w-64 h-10 p-1 mt-3 sm:w-44 sm:text-clip"
                                    placeholder="Change password"
                                    disabled={!editMode}
                                />
                                <div id="title-error" className="text-red-500">
                                    {errors.password?.type === 'minLength' && "Password must be at least 6 characters."}
                                </div>
                            </div>
                            {/* <div className="ml-3 w-28 h-10 bg-green-200 hover:bg-purple-200">
                            <p>log out</p>
                        </div> */}
                            <button
                                type={!editMode ? "submit" : "button"}
                                button="submit"
                                className="mt-2 w-20 h-10 ml-44 bg-maxbluepurple hover:bg-purple-200 sm:ml-24
                                hover:-rotate-3 hover:drop-shadow-xl transition duration-150"
                                onClick={() => setEditMode(!editMode)}
                            >{editMode ? "Save" : "Edit"}</button>
                        </div>
                    </div>

                </form>
            </div>
            <div id="right" className="w-56 -mt-[11.5rem] mr-40 text-center float-right md:mr-10
            sm:float-none sm:mt-0 sm:mb-4 sm:w-[21.5rem] sm:text-left sm:border-y-2 sm:py-3">
                <h3 className="text-2xl mb-4">Don't know where to start?</h3>
                <div className="w-44 h-9 ml-7 bg-maxbluepurple hover:bg-purple-200 sm:ml-[10.5rem] 
                hover:rotate-3 hover:drop-shadow-xl transition duration-150">
                    <p className="pt-1 text-lg text-center">Read the manual!</p>
                </div>
            </div>
        </div>

    );
}