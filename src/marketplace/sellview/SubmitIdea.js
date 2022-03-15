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

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../../AuthAPI';
import { ReactComponent as UploadIcon } from '../../assets/icons/upload-image.svg'

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const fileTypes = ["svg", "jpeg", "jpg", "png", "mp3", "mp4", "mpeg", "txt", "csv", "pdf", "json", "xml", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "rar", "zip"];

export default function SubmitIdea() {
    // Inter component context for authentication status
    const [, setAuthContext] = useContext(AuthContext);
    const navigate = useNavigate();
    // Hook for handling form and validation
    const { register, control, formState: { errors }, handleSubmit, reset } = useForm();
    // Logic help variables
    const [categoriesInputData, setCategoriesInputData] = useState({ inputValue: "", value: [] });
    const [files, setFiles] = useState([]);
    const [imgVisual, setImgVisual] = useState(null);
    const [tempPrice, setTempPrice] = useState(0);

    const clearForm = () => {
        setCategoriesInputData({ inputValue: "", value: [] });
        setFiles([]);
        setImgVisual(null);
        setTempPrice(0);
        reset();
    };

    const postIdea = (data) => {
        const status = toast.loading("Idea is uploading...", { autoClose: 5000 });
        axios
            .post(MAIN_API_URL + "/ideas/post", {
                "title": data.title,
                "short_desc": data.shortDescription,
                "long_desc": data.longDescription,
                "categories": data.categories?.map(category => category.value),
                "price": data.price
            }, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                toast.update(status, { render: "Idea is uploaded! Uploading files now!", type: "loading", isLoading: true, autoClose: 5000 });
                const formData = new FormData();
                files.forEach(file => {
                    formData.append("files", file, file.name);
                });
                formData.append("files", data.image[0], "title-" + data.image[0].name);
                axios.post(MAIN_API_URL + "/files/upload?idea_id=" + response.data, formData, {
                    headers: {
                        "Token": getToken(),
                        "Content-type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                    .then(() => {
                        toast.update(status, { render: "Idea and files uploaded successfully! Redirecting in 5 sec.", type: "success", isLoading: false, autoClose: 5000 });
                        // toast.success("Idea was uploaded successfully! Redirecting in 5 sec.");
                        clearForm();
                        setTimeout(() => navigate("/marketplace/buy"), 5000)
                    })
                    .catch((error) => {
                        if (error.response?.status === 401) {
                            removeToken("expired");
                            setAuthContext("unauthenticated");
                        }
                        else if (error.response) {
                            toast.update(status, { render: error.response.data.detail.msg, type: "error", isLoading: false, autoClose: 5000 });
                            // toast.error(error.response.data.detail.msg);
                        }
                        else if (error.request) {
                            // client never received a response, or request never left
                            toast.update(status, { render: "Network error! Please check your connection.", type: "error", isLoading: false, autoClose: 5000 });
                            // toast.error("Network error! Please check your connection.");
                        }
                        else {
                            toast.update(status, { render: "Unknown error! Please try again.", type: "error", isLoading: false, autoClose: 5000 });
                            // toast.error("Unknown error! Please try again.");
                        }
                    });
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    removeToken("expired");
                    setAuthContext("unauthenticated");
                }
                else if (error.response) {
                    toast.update(status, { render: error.response.data.detail.msg, type: "error", isLoading: false, autoClose: 5000 });
                    // toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                    toast.update(status, { render: "Network error! Please check your connection.", type: "error", isLoading: false, autoClose: 5000 });
                    // toast.error("Network error! Please check your connection.");
                }
                else {
                    toast.update(status, { render: "Unknown error! Please try again.", type: "error", isLoading: false, autoClose: 5000 });
                    // toast.error("Unknown error! Please try again.");
                }
            });
    }

    // Function to visualise the uploaded Image
    const handleImageChange = (e) => {
        if (e.target.files.length === 0) return;
        // console.log("NEW FILE");
        if (Math.floor(e.target.files[0].size * 0.00000095367432) > 500) {
            toast.error("File too large, size limit is 500 MB!");
            return;
        }
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
    };

    // Function for multi select input
    const createOption = (label) => ({
        label,
        value: label
    });

    const handleCategoriesChange = (value) => setCategoriesInputData({ value });
    const handleCategoriesInputChange = (inputValue) =>
        setCategoriesInputData({ inputValue: inputValue, value: categoriesInputData.value });
    const handleCategoriesKeyDown = (event) => {
        const { inputValue, value } = categoriesInputData;
        if (!inputValue) return;
        // console.log(event.key);
        switch (event.key) {
            case ' ':
            case 'Enter':
            case 'Tab':
                if (value.map(item => item.value).indexOf(inputValue) !== -1) return;
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
        if (Math.floor(file.size * 0.00000095367432) > 500) {
            toast.error("File too large, size limit is 500 MB!");
            return;
        }
        if (fileTypes.indexOf(file.name.match(/\.[0-9a-z]+$/i)[0].replace(".", "")) === -1) {
            toast.error("File type not allowed!");
            return;
        }
        if (files.map(function (e) { return e.name; }).indexOf(file.name) !== -1) {
            toast.error("Please don't duplicate files!");
            return;
        }
        setFiles([file, ...files]);
    };

    // Creates a list of fles
    const filesList = files.map((file) => {
        return (
            <div key={file.name} className="flex justify-between gap-2 items-center">
                <p className="break-all shrink">{file.name}</p>
                <button
                    type="button"
                    className="w-7 h-7 shrink-0 text-white bg-red-400 hover:bg-red-600"
                    onClick={() => setFiles(files.filter(item => item !== file))}
                >
                    x
                </button>
            </div>
        );
    });

    return (
        <div className="container items-center p-8 w-[46rem] border-4 sm:p-4 sm:w-[23.5rem] bg-maxbluepurple border-maxbluepurple">
            <form className="flex flex-col" onSubmit={handleSubmit(postIdea)}>
                <div className="flex flex-row gap-4 w-full mb-4">
                    {/* Container to visualise Image and input for uploading it */}
                    <div className='flex flex-col'>
                        <div id="image" className="w-40 h-40 flex flex-col flex-none sm:w-32 sm:h-32">
                            <div className="w-40 h-40 sm:w-32 sm:h-32 bg-slate-200 cursor-pointer relative"
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
                                <UploadIcon className="absolute w-1/4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer" />
                            </div>
                            <input
                                {...register("image", { required: true, onChange: (e) => handleImageChange(e) })}
                                id="select-image"
                                type="file"
                                hidden
                            // onChange={handleImageChange}
                            />
                        </div>
                        <div id="image-error" className="w-40 sm:w-32 break-words text-red-500">
                            {errors.image?.type === 'required' && "Cover image is reqiured."}
                        </div>
                    </div>

                    {/* Title and short description */}
                    <div className="grow">
                        <input
                            className="w-full mb-2"
                            type="text"
                            placeholder="Title"
                            {...register("title", { required: true, minLength: 5, maxLength: 50 })}
                        />
                        <div id="title-error" className="text-red-500">
                            {errors.title?.type === 'required' && "Title is reqiured."}
                            {errors.title?.type === 'minLength' && "Title must be at least 5 characters."}
                            {errors.title?.type === 'maxLength' && "Title must be at most 50 characters."}
                        </div>

                        <textarea
                            className="w-full h-[6.5rem] sm:h-[4.5rem] resize-none"
                            placeholder="Short description"
                            {...register("shortDescription", { required: true, minLength: 10, maxLength: 300 })}
                        />
                        <div id="short-error" className="text-red-500">
                            {errors.shortDescription?.type === 'required' && "Short description is reqiured."}
                            {errors.shortDescription?.type === 'minLength' && "Short description must be at least 10 characters."}
                            {errors.shortDescription?.type === 'maxLength' && "Short description must be at most 300 characters."}
                        </div>
                    </div>
                </div>

                <textarea
                    className="w-full h-52 mb-4"
                    placeholder={"Long description"}
                    {...register("longDescription", { required: true, minLength: 300 })}
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
                            components={{ DropdownIndicator: null, }}
                            inputValue={categoriesInputData.inputValue}
                            isClearable={true}
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
                <div id="file-upload" className="mb-4 bg-white bg-opacity-50 pl-2">
                    <FileUploader
                        children={
                            <div className="h-10 border py-2 px-3 -ml-2 text-grey-darkest cursor-pointer truncate bg-white">
                                Click or drop to upload!<span className="text-xs right-0" title={fileTypes.map((item) => " " + item)}>{fileTypes.map((item) => " " + item)}</span>
                            </div>
                        }
                        types={fileTypes}
                        handleChange={handleFileUploadChange}
                        name="file"
                    />
                    <div className={filesList.length === 0 ? "flex flex-col gap-3 " : "flex flex-col gap-3 p-3"}>
                        {filesList}
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col sm:w-ful">
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
                                    className="w-60 sm:w-full mb-2"
                                    id="price-input"
                                    name="price"
                                    prefix='$ '
                                    allowNegativeValue={false}
                                    decimalSeparator="."
                                    groupSeparator=" "
                                    value={tempPrice}
                                    placeholder="Please enter a price"
                                    defaultValue={undefined}
                                    decimalsLimit={2}
                                    onValueChange={(value) => { setTempPrice(value); field.onChange(value); }}
                                />)}
                        />

                        <div id="price-error" className="text-red-500">
                            {errors.price?.type === 'required' && "Price is reqiured."}
                            {errors.price?.type === 'min' && "Price must be above $ 0.50 ."}
                            {errors.price?.type === 'max' && "Price must be below $ 999 999.99 ."}
                        </div>
                    </div>
                    <div className="grow"></div>
                    <div className='sm:mt-4'>
                        <button type="button"
                            className="py-2 px-9 uppercase text-lg bg-yankeesblue text-slate-200 hover:bg-purple-700 sm:w-32
                        hover:scale-105 hover:shadow-lg transition hover:rotate-3"
                            onClick={clearForm}>Reset</button>
                        <button
                            type="submit"
                            className="ml-5 right-0 py-2 px-9 uppercase text-lg bg-jasmine hover:bg-amber-500 sm:w-[11.7rem]
                        hover:scale-105 hover:shadow-lg transition hover:rotate-3"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}