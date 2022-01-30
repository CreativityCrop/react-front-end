// ----------------- Idea Submittion Form ----------------- \\
//                       Consists of:                       \\
// Title - min 5 chars, max 50 chars                        \\
// Image - allowed types are png, jpg                       \\
// Short description - min 10 chars, max 300 chars          \\
// Long description - min 300 chars                         \\
// Categories - idk maybe its not required
// Files - not required
// Price - min 0.5$ and max is 999 999.99$

import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { FileUploader } from "react-drag-drop-files";
import CurrencyInput from 'react-currency-input-field';

import AuthProvider, { getToken, removeToken, AuthContext, MAIN_API_URL } from '../../AuthAPI';
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-image.svg'

import axios from 'axios';

const fileTypes = ["svg", "jpeg", "jpg", "png", "mp3", "mp4", "mpeg", "txt", "csv", "pdf", "json", "xml", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "rar", "zip"];

export default function SubmitIdea() {
    // Inter component context for authentication status
    const [, setAuthContext] = useContext(AuthContext);
    // Hook for handling form and validation
    const { register,control, formState: { errors }, handleSubmit } = useForm();
    // Logic help variables
    const [categoriesInputData, setCategoriesInputData] = useState({inputValue: "", value: []});
    const [files, setFiles] = useState([]);
    const [imgVisual, setImgVisual] = useState(null);

    const postIdea = (data) => {
        axios
            .post(MAIN_API_URL + "/ideas/post", {
                "title": data.title,
                "short_desc": data.shortDescription,
                "long_desc": data.longDescription,
                "categories": data.categories.map(category => category.value),
                "price": data.price
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
                        console.log("Idea text uploaded");
                        const formData = new FormData();
                        files.forEach( file => {
                            formData.append("files", file, file.name);
                        });
                        console.log(data.image);
                        formData.append("files", data.image[0], "img-" + response.data + data.image[0].name.match(/\.[0-9a-z]+$/i)[0]);
                        axios.post(MAIN_API_URL + "/files/upload?idea_id=" + response.data, formData, {
                            headers: {
                                "Token": getToken(),
                                "Content-type": "multipart/form-data",
                                "Access-Control-Allow-Origin": "*"
                            }
                        })
                        .then((response) => {
                            switch(response.status) {
                                case 200:
                                    console.log("Files uploaded!");
                                    break;
                                    default: break;
                                }
                        })
                        .catch((error) => {
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
                        })
                    break;
                    default: break;
                }
            })
            .catch((error) => {
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
    }
    
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

    // Function for multi select input
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


    // Logic for file upload field
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

    // Creates a list of fles
    const filesList = files.map((file) => {
        return(
            <div key={file.name} className="flex my-3">
                <p>{file.name}</p>
                <button
                    type="button"
                    className="w-7 h-7 ml-10 text-white bg-red-400 hover:bg-red-600"
                    onClick={() => setFiles(files.filter(item => item !==file))}
                >
                    x
                </button>
            </div>
        );
    });

    return(
    <>
        <AuthProvider/>
        <div className="container items-center p-8 ml-24 w-[46rem] border-4">
            <form className="" onSubmit={handleSubmit(postIdea)}>
                <div className="flex flex-row max-h-96 mb-4">
                    {/* Container to visualise Image and input for uploading it */}
                    <div id="image" className="w-40 h-40 flex flex-col flex-none">
                        <div className="w-40 h-40 bg-slate-200 cursor-pointer relative "
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
                            hidden type="file" 
                            {...register("image", {required: true})}
                            onChange={handleImageChange}
                        />
                        <div id="image-error" className="break-words text-red-500">
                            {errors.image?.type === 'required' && "Cover image is reqiured."}
                        </div>
                    </div>

                    {/* Title and short description */}
                    <div className="grow ml-3">
                        <input 
                            className="w-full mb-3"
                            type="text"
                            placeholder="Title"
                            {...register("title", {required: true, minLength: 5, maxLength: 50})}
                        />
                        <div id="title-error" className="text-red-500">
                            {errors.title?.type === 'required' && "Title is reqiured."}
                            {errors.title?.type === 'minLength' && "Title must be at least 5 characters."}
                            {errors.title?.type === 'maxLength' && "Title must be at most 50 characters."}
                        </div>
                        
                        <textarea
                            className="w-full h-24 resize-none"
                            placeholder="Short description"
                            {...register("shortDescription", {required: true, minLength: 10, maxLength: 300})}
                        />
                        <div id="longdesc-error" className="text-red-500">
                            {errors.shortDescription?.type === 'required' && "Short description is reqiured."}
                            {errors.shortDescription?.type === 'minLength' && "Short description must be at least 10 characters."}
                            {errors.shortDescription?.type === 'maxLength' && "Short description must be at most 300 characters."}
                        </div>
                    </div>
                </div>
                
                <textarea 
                    className="w-[41.5rem] h-52 mb-3"
                    placeholder={"Long description"}
                    {...register("longDescription", {required: true, minLength: 300})}
                />
                <div id="longdesc-error" className="text-red-500">
                    {errors.longDescription?.type === 'required' && "Long description is reqiured."}
                    {errors.longDescription?.type === 'minLength' && "Long description must be at least 300 characters."}
                </div>
                <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            outlineColor: 'black'
                        })}
                        className="mb-4"
                        components={{DropdownIndicator: null,}}
                        inputValue={categoriesInputData.inputValue}
                        isClearable = {true}
                        isMulti
                        menuIsOpen={false}
                        
                        onChange={handleCategoriesChange}
                        onKeyDown={handleCategoriesKeyDown}
                        onInputChange={
                            (event) => {
                                field.onChange(categoriesInputData.value);
                                handleCategoriesInputChange(event);
                            }
                        }
                        placeholder="Categories: Type and press enter or tab"
                        value={categoriesInputData.value}
                    />
                    )}
                />
                <div id="file-upload" className="mb-4">
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
                    <div className="flex flex-col">
                        <Controller
                            name="price"
                            control={control}
                            rules={{
                                required: true,
                                min: 0.5,
                                max: 999999.99
                            }}
                            render={({ field }) => (
                            <CurrencyInput
                                className="w-60 mr-36"
                                id="input-example"
                                name="input-name"
                                prefix='$ '
                                allowNegativeValue={false}
                                decimalSeparator="."
                                groupSeparator=" "
                                placeholder="Please enter a number"
                                defaultValue={40}
                                decimalsLimit={2}
                                onValueChange={(value) => field.onChange(value)}
                            />)}
                        />
                        
                        <div id="price-error" className="text-red-500">
                            {errors.price?.type === 'required' && "Price is reqiured."}
                            {errors.price?.type === 'min' && "Price must be above $ 0.50 ."}
                            {errors.price?.type === 'max' && "Price must be below $ 999 999.99 ."}    
                        </div>
                    </div>
                    <button
                        type="submit" 
                        className="ml-36 py-[0.4rem] px-9 uppercase text-lg bg-green-200 hover:bg-purple-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
            
        </div>
    </>
    );
}