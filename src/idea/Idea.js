import Filters  from "./Filter";

import React, { useContext, useState } from 'react';
import axios from 'axios';

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../AuthAPI';

export default function Idea(props) {
    const [, setAuthContext] = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(null);

    const likeIdea = (event, id) => {
        event.preventDefault();
        axios.put(MAIN_API_URL + "/ideas/like?id=" + id, {}, {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(function (response) {
            switch(response.status) {
                case 200: setLikeCount(response.data.likes); break;
                default: break;
            }
        })
        .catch(function (error) {
            console.log(error) 
            switch(error.response.status) {
                case 401:
                    switch(error.response.data.detail.errno) {
                        case 103: 
                            removeToken();
                            setAuthContext("unathenticated");
                        break;
                        default: break;
                    }
                break;
                default: break;
            }
        });
    };

    const categList = JSON.parse(props.categories).categories.map((category) => {
        return <Filters key={category} category={category}/>
    });
    return (
        <div id="idea" className="bg-yellow-300 mb-20" key={props.title}>
            <div className="w-20">
                <img src="" alt=""/>
            </div>
            <h4>{props.title}</h4>
            <div id="short-desc">
                <h5 className="pt-3 pb-3">Short description</h5>
                <p>{props.shortDesc}</p>
            </div>
            {
                props.longDesc !== null?
                    <div id="long-desc">
                        <h5 className="pt-3 pb-3">Long description</h5>
                        <p>{props.longDesc}</p>
                    </div>
                : ""
            }
            <div id="filters" className="grid grid-cols-10 gap-4">
                {categList}
            </div>
            <h4>{props.price}$</h4>
            <div className="flex ">
                <h4>{ likeCount===null ? props.likes : likeCount}</h4>
                <button type="button" onClick={(e) => {
                    likeIdea(e, props.id);
                }}>👍</button>
            </div>
            <div className="bg-green-300">
                <p>buy it!!!</p>
            </div>
        </div>
    );
}