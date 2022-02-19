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
            console.log("AVATAR CHANGED");
        }
        if (data.username !== undefined && props.userData.username !== data.username) {
            formData.append("username", data.username);
            console.log("USERNAME CHANGED");
        }
        if (data.email !== undefined  && props.userData.email !== data.email) {
            formData.append("email", data.email);
            console.log("EMAIL CHANGED");
        }
        if (data.iban !== undefined  && props.userData.iban !== data.iban) {
            formData.append("iban", data.iban);
            console.log("IBAN CHANGED");
        }
        if (data.password !== undefined  && !!data.password) {
            console.log(data.password);
            formData.append("pass_hash", sha3_256(data.password));
            console.log("PAASS CHANGED");
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
                    setToken(response.data.token.accessToken);
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
            toast.error("Filetype not allowed! Only jpeg, jpg and png.");
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
        <div id="account-settings" className="flex flex-row sm:flex-col w-fit items-center justify-center m-auto gap-16">
            <div id="settings" className="flex flex-row gap-6">
                {editMode ?
                    <div id="upload-avatar" className="flex flex-col flex-none">
                        <div className="w-48 h-48 sm:w-36 sm:h-36 flex justify-center items-center bg-slate-200 cursor-pointer"
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
                            <UploadIcon className="w-1/2"/>
                        </div>
                        <input
                            hidden
                            type="file"
                            id="select-image"
                            {...register("avatar", { onChange: (e) => handleImageChange(e) })}
                        />
                    </div>
                    :
                    <img src={props.avatarUrl} alt="user avatar" className="w-48 h-48 sm:w-36 sm:h-36 bg-slate-300"/>
                }

                <form className="w-fit" onSubmit={handleSubmit(updateUser)}>
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
                    <button
                        type={!editMode ? "submit" : "button"}
                        // button="submit"
                        className="mt-2 w-20 h-10 ml-44 bg-maxbluepurple hover:bg-purple-200 sm:ml-24
                                    hover:-rotate-3 hover:drop-shadow-xl transition duration-150"
                        onClick={() => setEditMode(!editMode)}
                    >{editMode ? "Save" : "Edit"}</button>
                </form>
            </div>
            <div id="manual" className="w-56 sm:w-full text-center sm:border-y-2 sm:py-6 ">
                <h3 className="text-2xl mb-4">Don't know where to start?</h3>
                <button className="w-44 h-9 m-auto text-lg text-center bg-maxbluepurple hover:bg-purple-200 hover:rotate-3 hover:drop-shadow-xl transition duration-150">
                    Read the manual!
                </button>
            </div>
        </div>

    );
}