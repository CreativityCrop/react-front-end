import React, { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import AuthProvider, { getToken, removeToken, AuthContext, MAIN_API_URL } from '../../AuthAPI';

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["svg", "jpeg", "jpg", "png", "mp3", "mp4", "mpeg", "txt", "csv", "pdf", "json", "xml", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "rar", "zip"];


const components = {
    DropdownIndicator: null,
};

export default function SubmitIdea() {
    const [, setAuthContext] = useContext(AuthContext);
    const [title, setTitle] = useState("Title");
    const [shortDesc, setShortDesc] = useState("Short description");
    const [longDesc, setLongDesc] = useState("Long description");
    const [categoriesInputData, setCategoriesInputData] = useState({inputValue: "", value: []});
    const [files, setFiles] = useState([]);
    const [price, setPrice] = useState(0);
    const [success, setSuccess] = useState(false);
    const [picture, setPicture] = useState(null);
    const [picVisual, setPicVisual] = useState(null);

    
    const isFormValid = () => {
        return true;
    }
    
    const postIdea = (event) => {
        event.preventDefault();
        if(!isFormValid()) {
            return;
        } 
        else {
            axios
            .post(MAIN_API_URL + "/ideas/post", {
                "title": title,
                "short_desc": shortDesc,
                "long_desc": longDesc,
                "categories": categoriesInputData.value.map(item => item.value),
                "price": price
            }, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                switch(response.status) {
                    case 200:
                        const formData = new FormData();
                        files.forEach( file => {
                            formData.append("files", file, file.name);
                        });
                        formData.append("files", picture, "img-" + response.data);
                        axios.post(MAIN_API_URL + "/files/upload?idea_id=" + response.data, formData, {
                            headers: {
                                "Token": getToken(),
                                "Content-type": "multipart/form-data",
                                "Access-Control-Allow-Origin": "*"
                            }
                        }).then((response) => {
                            switch(response.status) {
                                case 200:
                                    setSuccess(true);
                                    break;
                                    default: break;
                                }
                            }).catch((error) => {
                                console.log(error) 
                                switch(error.response.status) {
                                case 401:
                                    switch(error.response.data.detail.errno) {
                                        case 103: 
                                        setSuccess(false);
                                        removeToken();
                                        setAuthContext("unathenticated");
                                        break;
                                        default: break;
                                    }
                                    break;
                                    default: break;
                                }
                            })
                            break;
                            default: setSuccess(false); break;
                        }
                    })
                    .catch((error) => {
                        console.log(error) 
                        switch(error.response.status) {
                    case 401:
                        switch(error.response.data.detail.errno) {
                            case 103: 
                            setSuccess(false);
                            removeToken();
                            setAuthContext("unathenticated");
                            break;
                            default: break;
                        }
                    break;
                    default: break;
                }
            });
        }
        
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

    const createOption = (label) => ({
        label,
        value: label
    });

    const handleCategoriesChange = (value) => setCategoriesInputData({ value });
    const handleCategoriesInputChange = (inputValue) =>
                setCategoriesInputData({inputValue: inputValue, value: categoriesInputData.value});    
    const handleCategoriesKeyDown = (event) => {
        const { inputValue, value } = categoriesInputData;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                if(value.map(item => item.value).indexOf(inputValue) !== -1) return;
                setCategoriesInputData({
                    inputValue: "",
                    value: [...value, createOption(inputValue)]
                });
            event.preventDefault();
          break;
          default: break;
        }
    };

    const handleFileUploadChange = (file) => {
        if(fileTypes.indexOf(file.name.match(/\.[0-9a-z]+$/i)[0].replace(".","")) === -1) {
            alert("Filetype not allowed!");
            return;
        }
        if(files.map(function(e) { return e.name; }).indexOf(file.name) !== -1) {
            alert("Please don't duplicate files!");
            return;
        }
        setFiles([file, ...files]);
    };

    const filesList = files.map((file) => {
        return(
            <div key={file.name} className="flex my-3">
                <p>{file.name}</p>
                <button
                    type="button"
                    className="ml-10 p-30 uppercase text-lg text-white bg-red-400 hover:bg-red-600"
                    onClick={() => setFiles(files.filter(item => item !==file))}
                >
                    ×
                </button>
            </div>
        );
    });

    return (<>
        <AuthProvider/>
        { success ? <h1>Idea posted!</h1> :
        <div className="container items-center p-8 ml-24 w-[46rem] border-4">
            {/* here */}
            <form className="" onSubmit={postIdea}>
                <div className="flex flex-row">
                    <div className="w-40 h-40 bg-slate-200 cursor-pointer relative "
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
                        <div className="absolute top-1/2 left-1/2 translate-x-[-30%] translate-y-[-50%] cursor-pointer text-red-500">
                            Click to upload!
                        </div>
                    </div>

                    <div className="ml-3">
                        <div className="mb-3">
                            <input 
                                className="w-full border py-2 px-3 text-grey-darkest"
                                type="text"
                                placeholder={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                placeholder={shortDesc}
                                onChange={
                                    (e) => setShortDesc(e.target.value)
                                }
                                className="w-[30.6rem] h-[6.55rem]"/>
                        </div>
                    </div>
                </div>
                
                <div className="mb-3">
                    <textarea 
                        placeholder={longDesc}
                        onChange={
                            (e) => setLongDesc(e.target.value)
                        } 
                        className="w-[41.5rem] h-52"/>
                </div>
                
                <div className="mb-3">
                    <CreatableSelect
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            outlineColor: 'black'
                        })}
                        components={components}
                        inputValue={categoriesInputData.inputValue}
                        isClearable
                        isMulti
                        menuIsOpen={false}
                        onChange={handleCategoriesChange}
                        onInputChange={handleCategoriesInputChange}
                        onKeyDown={handleCategoriesKeyDown}
                        placeholder="Type and press enter"
                        value={categoriesInputData.value}
                    />                
                </div>
                <div id="file-upload">
                    <FileUploader
                        children={
                            <div className="h-10 mb-3 border py-2 px-3 text-grey-darkest cursor-pointer ">
                                Click or drop to upload!<span className="text-xs right-0">{fileTypes.map((item) => " "+item)}</span>
                            </div>
                        }
                        handleChange={handleFileUploadChange}
                        name="file"
                    />
                    {filesList}
                </div>
                <div className="flex flex-row">
                    <div>
                        <input
                            type="text"
                            placeholder={price + " $"} 
                            onChange={
                                (e) => setPrice(e.target.value)
                            }
                            className="w-60 mr-36"/>
                    </div>
                    <button className="ml-36 py-[0.4rem] px-9 uppercase text-lg bg-green-200 hover:bg-purple-200" 
                            type="submit" onClick={postIdea}>
                        Submit
                    </button>
                </div>
            </form>
            
        </div>
        }
    </>);
}