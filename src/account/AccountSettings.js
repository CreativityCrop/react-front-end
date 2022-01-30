import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { sha3_256 } from 'js-sha3';

import { MAIN_API_URL, AuthContext, setToken, getToken, removeToken, regex_user, regex_email } from '../AuthAPI';

import { ReactComponent as UploadIcon } from '../assets/icons/upload-image.svg'

export default function AccountSettings(props) {
    const [, setAuthContext] = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [imgVisual, setImgVisual] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const updateUser = (data) => {
        const formData = new FormData();
        if(data.avatar.length !== 0) {
            formData.append("avatar", data.avatar[0], data.avatar[0]?.name);
        }
        if(data.username !== undefined) {
            formData.append("username", data.username);
        }
        if(data.email !== undefined) {
            formData.append("email", data.email);
        }
        if(data.password !== undefined) {
            formData.append("pass_hash", sha3_256(data.password));
        }
        axios.put(MAIN_API_URL + "/account", formData, {
            headers: {
                "Token": getToken(),
                "Content-type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"

            }
        }).then((response) => {
            switch(response.status) {
                case 200:
                    if(response.data.token !== undefined) {
                        setToken(response.data.token);
                    }
                    window.location.reload(false);
                break;
                default: break;
            }
        }).catch((error) => {
            console.log(error);
            switch(error.response.status) {
                case 401:
                    switch(error.response.data.detail.errno) {
                        case 103:
                        removeToken();
                        setAuthContext("unauthenticated");
                        break;
                        default: break;
                    }
                break;
                default: break;
            }
        });
        setImgVisual(null);
    };

    // Function to visualise the uploaded Image
    const handleImageChange = (e) => {
        if(e.target.files.length === 0 ) return;
        if(["png", "jpg", "jpeg"].indexOf(e.target.files[0].name.match(/\.[0-9a-z]+$/i)[0].replace(".","")) === -1) {
            alert("Filetype not allowed!");
            return;
        }
        //console.log("picture: ", e.target.files);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgVisual(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <div id="holder-of-the-acc" className="flex flex-row mb-4">
            { editMode ? 
                <div id="image" className="w-48 h-48 mr-4 flex flex-col flex-none">
                    <div className="w-48 h-48 bg-slate-200 cursor-pointer relative "
                        style={
                            {
                                bacgroundColor: 'none',
                                backgroundImage: `url(${imgVisual})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center"
                            }
                        }
                        onClick={ (e) => document.getElementById("select-image").click() }
                    >
                        <UploadIcon className="absolute w-1/4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer" />
                    </div>
                    <input 
                        id="select-image"
                        {...register("avatar", {onChange: (e) => handleImageChange(e)})}
                        hidden type="file"
                    />
                    <div id="image-error" className="break-words text-red-500">
                        {/* {errors.image?.type === 'required' && "Cover image is reqiured."} */}
                    </div>
                </div> 
                : 
                <div id="left" className="w-48 h-48 mr-4 bg-slate-300">
                    <img src={props.avatarUrl} alt="user avatar"/>
                </div>
            }
            
            <form className="" onSubmit={handleSubmit(updateUser)}>
            <div id="middle" className="mr-4">
                <div className="flex flex-row mb-3">
                    <div>
                        <input
                            {...register("username", { minLength: 4, maxLength: 18, pattern: regex_user })}
                            type="text"
                            className="w-56 h-10 p-1"
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
                            className="w-56 h-10 p-1 mt-4"
                            defaultValue={props.userData.email}
                            disabled={!editMode}
                        />
                        <div id="title-error" className="text-red-500">
                            {errors.email?.type === 'pattern' && "Email must be valid."}
                        </div>

                        <input
                            {...register("password", { minLength: 6 })}
                            type="password"
                            className="w-56 h-10 p-1 mt-4"
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
                        className="ml-3 w-10 h-10 bg-green-200 hover:bg-purple-200"
                        onClick={() => setEditMode(!editMode)}
                    >{editMode ? "Save" : "Edit"}</button>
                </div>
                {/* <div className="border-4 w-auto p-1 h-32">
                    <p>short bio</p>
                </div> */}
            </div>
            
            </form>
            <div id="right" className="w-56 mt-7 text-center">
                <h3 className="text-2xl mb-4">Don't know where to start?</h3>
                <div className="w-44 h-9 ml-7 bg-green-200 hover:bg-purple-200">
                    <p className="pt-1 text-lg text-center">Read the manual!</p>
                </div>
            </div>
        </div>
    );
}