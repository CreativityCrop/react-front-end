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
        <div className="container items-center p-8 ml-24 w-[46rem] border-4">
            {/* here */}
            <form className="" onSubmit={postIdea}>
                <div className="flex flex-row">
                    <div className="w-40 h-40 bg-slate-200">
                        <p>img upload</p>
                    </div>
                    <div className="ml-3">
                        <div className="mb-3">
                            <input 
                                className="w-[25rem] border py-2 px-3 text-grey-darkest"
                                type="text"
                                placeholder={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea placeholder={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-[30.6rem] h-[6.55rem]"/>
                        </div>
                    </div>
                </div>
                
                <div className="mb-3">
                    <textarea placeholder={longDesc} onChange={(e) => setLongDesc(e.target.value)} className="w-[41.5rem] h-52"/>
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
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type and press enter"
                        value={categoriesInputData.value}
                    />                
                </div>
                <div className="flex flex-row">
                    <div>
                        <input type="text" placeholder={price + " $"} onChange={(e) => setPrice(e.target.value)} className="w-60 mr-36"/>
                    </div>
                    <button className="ml-36 py-[0.4rem] px-9 uppercase text-lg bg-green-200 hover:bg-purple-200" 
                            type="submit" onClick={postIdea}
                    >
                        Submit
                    </button>
                </div>
            </form>
            
        </div>
        }
    </>);
}