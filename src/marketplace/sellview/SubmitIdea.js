import React, { useState, useContext } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import AuthProvider, { getToken, removeToken, AuthContext, MAIN_API_URL } from '../../AuthAPI';


const components = {
    DropdownIndicator: null,
};

export default function SubmitIdea() {
    const [, setAuthContext] = useContext(AuthContext);
    const [title, setTitle] = useState("Title");
    const [shortDesc, setShortDesc] = useState("Short description");
    const [longDesc, setLongDesc] = useState("Long description");
    const [categoriesInputData, setCategoriesInputData] = useState({
        inputValue: "",
        value: []
    });
    const [price, setPrice] = useState(0);
    const [success, setSuccess] = useState(false);

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
            .then(function (response) {
                switch(response.status) {
                    case 200: setSuccess(true); break;
                    default: setSuccess(false); break;
                }
            })
            .catch(function (error) {
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

    const createOption = (label) => ({
        label,
        value: label
    });

    const handleChange = (
        value,
        actionMeta
      ) => {
        // console.log("Value Changed");
        // console.log(value);
        // console.log(`action: ${actionMeta.action}`);
        setCategoriesInputData({ value });
      };
    const handleInputChange = (inputValue) => {
        setCategoriesInputData({inputValue: inputValue, value: categoriesInputData.value});
      };
    
    const handleKeyDown = (event) => {
        const { inputValue, value } = categoriesInputData;
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                // console.group('Value Added');
                // console.log(value);
                // console.groupEnd();
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

    return (<>
        <AuthProvider/>
        { success ? <h1>Idea posted!</h1> :
        <div className="container items-center px-5 py-12 lg:px-20 w-[32rem]">
            <form className="" onSubmit={postIdea}>
                <div className="flex flex-col mb-4">
                    <input 
                        className="border py-2 px-3 text-grey-darkest"
                        type="text"
                        placeholder={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <textarea placeholder={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                </div>
                <div className="flex flex-col mb-4">
                    <textarea placeholder={longDesc} onChange={(e) => setLongDesc(e.target.value)} />
                </div>
                
                <div className="flex flex-col mb-4 outline-none">
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
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type and press enter"
                        value={categoriesInputData.value}
                    />                
                </div>
                <div className="flex flex-col mb-4">
                    <input type="text" placeholder={price + " $"} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <button className="block bg-teal hover:bg-teal-dark text-black uppercase text-lg mx-auto p-4 rounded" 
                        type="submit" onClick={postIdea}
                >
                    Submit
                </button>
            </form>
            
        </div>
        }
    </>);
}