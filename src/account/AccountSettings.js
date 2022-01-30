import { useEffect, useState, useContext } from 'react';

import { MAIN_API_URL, getToken, removeToken, AuthContext } from '../AuthAPI';
import axios from 'axios';

export default function AccountSettings(props) {
    const [editMode, setEditMode] = useState(false);


    return (
        <div id="holder-of-the-acc" className="flex flex-row mb-4">
            { editMode ? <AvatarUpload/> : 
            <div id="left" className="w-48 h-48 mr-4 bg-slate-300">
                <img src={props.avatarUrl} alt="user avatar"/>
            </div>}
            <div id="middle" className="mr-4 mt-3">
                <div className="flex flex-row mb-3">
                    <div className="border-4 w-56 h-10 p-1 mr-36">
                        <p>Username</p>
                    </div>
                    {/* <div className="ml-3 w-28 h-10 bg-green-200 hover:bg-purple-200">
                        <p>log out</p>
                    </div> */}
                    <button 
                        type="button"
                        className="ml-3 w-10 h-10 bg-green-200 hover:bg-purple-200"
                        onClick={() => setEditMode(!editMode)}
                    >{editMode ? "Save" : "Edit"}</button>
                </div>
                <div className="border-4 w-auto p-1 h-32">
                    <p>short bio</p>
                </div>
            </div>
            <div id="right" className="w-56 mt-7 text-center">
                <h3 className="text-2xl mb-4">Don't know where to start?</h3>
                <div className="w-44 h-9 ml-7 bg-green-200 hover:bg-purple-200">
                    <p className="pt-1 text-lg text-center">Read the manual!</p>
                </div>
            </div>
        </div>
    );
}

function AvatarUpload() {
    const [, setAuthContext] = useContext(AuthContext);
    const [picture, setPicture] = useState(null);
    const [picVisual, setPicVisual] = useState(null);

    const uploadAvatar = () => {
        const formData = new FormData();
        formData.append("files", picture, "image-name.png");
        axios.post(MAIN_API_URL + "/files/upload/urlidkd", formData, {
            headers: {
                "Token": getToken(),
                "Content-type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
            }
        }).then((response) => {
            switch(response.status) {
                case 200:
                    break;
                    default: break;
                }
            }).catch((error) => {
                console.log(error) 
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
            })
    }

    const onChangePicture = (e) => {
        if(["png", "jpg", "jpeg", "svg"].indexOf(e.target.files[0].name.match(/\.[0-9a-z]+$/i)[0].replace(".","")) === -1) {
            alert("Filetype not allowed!");
            return;
        }
        if(e.target.files[0]) {
            //console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPicVisual(reader.result);
            });
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    return(
        <div id="left" className=" flex flex-row w-48 h-48 mr-4 bg-slate-300"
            style={
                {
                    bacgroundColor: 'none',
                    backgroundImage: `url(${picVisual})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                }
            }
            onClick={ (e) => document.getElementById("select-image").click() }
        >
            <input id="select-image" hidden type="file" onChange={onChangePicture} />
            <div className="cursor-pointer text-red-500">
                Click to upload!
            </div>
        </div>
    );
}