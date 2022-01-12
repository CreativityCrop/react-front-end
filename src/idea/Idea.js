import Filters  from "./Filter";

import React, { useContext, useState } from 'react';
import { useNavigate, /*useLocation*/ } from 'react-router-dom';
import axios from 'axios';

import { getToken, removeToken, AuthContext, MAIN_API_URL } from '../AuthAPI';

export default function Idea(props) {
    //let location = useLocation();
    const navigate = useNavigate();
    const [authContext, setAuthContext] = useContext(AuthContext);
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

    function getCateg() {
        if(props.categories === undefined) {
            return;
        }
        const categList = JSON.parse(props.categories).categories.map((category) => {
            return <Filters key={category} category={category}/>
        });
        return categList;
    };

    return (
        <div className="flex flex-row m-4 border-4 p-2" key={props.title}>
            <div className="bg-slate-300 w-40 h-40 ">
                <p>img</p>
            </div>
            <div>
                <div className="flex flex-row">
                    <div className="ml-2">
                        <h3 className="text-2xl">{props.title}</h3>
                    </div>
                    {   authContext==="authenticated" ? <div className="flex ">
                            <h3>{ likeCount===null ? props.likes : likeCount}</h3>
                            <button type="button" onClick={(e) => {
                                likeIdea(e, props.id);
                            }}>👍</button>
                        </div> : ""
                    }
                </div>
                {
                    props.shortDesc !== undefined ?
                    <div className="ml-2 mb-3 w-[30rem]">
                        <p className="text-base">{
                            props.listView ?
                            props.shortDesc.substring(0, 150) + (props.shortDesc.length<=150 ? "" : " ...")  
                            : props.shortDesc
                        }</p>
                    </div>
                    : ""
                }
                {
                    props.longDesc !== undefined ?
                        <div id="long-desc">
                            <h5 className="pt-3 pb-3">Long description</h5>
                            <p>{props.longDesc}</p>
                        </div>
                    : ""
                }
                <div className="flex flex-row space-x-3 ml-2">
                    {
                        getCateg()
                    }
                </div>
                <div className="grid grid-cols-2 mt-3 ml-2">
                    {
                        props.price !== undefined ?
                        <div className="w-48 h-8 bg-red-200">
                            <h3 className="text-lg text-center">${props.price}</h3>
                        </div>
                        : ""
                    }
                    <div className="w-48 h-8 bg-green-200 hover:bg-purple-200">
                        {
                            props.listView ? <button className="text-lg text-center w-48 h-8" onClick={(e) => {navigate("/marketplace/buy/" + props.id)}}>See more</button> : ""
                        }
                        {
                            props.buyView ? <button className="text-lg text-center w-48 h-8" onClick={(e) => {console.log("YOU BOUGHT THE IDEA")}}>Buy Now</button> : ""
                        
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}