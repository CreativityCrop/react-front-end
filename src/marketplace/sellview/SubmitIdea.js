import { useState, useContext } from 'react';
import axios from 'axios';

import AuthProvider, { getToken, removeToken, AuthContext, MAIN_API_URL } from '../../AuthAPI';

export default function SubmitIdea() {
    const [, setAuthContext] = useContext(AuthContext);

    const [title, setTitle] = useState("Title");
    const [shortDesc, setShortDesc] = useState("Short description");
    const [longDesc, setLongDesc] = useState("Long description");
    const [categories, setCategories] = useState('{"categories": ["funny", "stupid"]}');
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
                "categories": JSON.parse(categories),
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

    return (<>
        <AuthProvider/>
        { success ? <h1>Idea posted!</h1> :
        <div className="container items-center px-5 py-12 lg:px-20 bg">
            <form className="" onSubmit={postIdea}>
                <div className="flex flex-col mb-4">
                    <input className="border py-2 px-3 text-grey-darkest" type="text" placeholder={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex flex-col mb-4">
                    <textarea placeholder={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
                </div>
                <div className="flex flex-col mb-4">
                    <textarea placeholder={longDesc} onChange={(e) => setLongDesc(e.target.value)} />
                </div>
                <div className="flex flex-col mb-4">
                    <input type="text" placeholder={categories} onChange={(e) => setCategories(e.target.value)} />
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