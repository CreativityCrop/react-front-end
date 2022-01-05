import Filters  from "./Filter";
import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { getToken, MAIN_API_URL } from '../AuthAPI'
import axios from 'axios';

export default function ListedIdea(props){
    const params = useParams();
    const auth = getToken();
    const [idea, setIdea] = useState({});

    useEffect(() => {
        const req = async () => {
            const response = await axios.get(MAIN_API_URL + "/idea/" + params.ideaID, {
                headers: {
                    "Token": auth,
                    "Content-Type": "application/json"
                }
            });
            setIdea(response.data);
        }
        req();
    }, [params, auth]);

    return(
        <div>
            <div className="w-20">
                <img src="" alt=""/>
            </div>
            <h4>{idea.title}</h4>
            <h5 className="pt-3 pb-3">Short description</h5>
            <p>{idea.short_desc}</p>
            { !props.forSale
                ? <div>
                    <h5 className="pt-3 pb-3">Long description</h5>
                    <p>{idea.long_desc}</p>
                </div>
                : "" 
            }
            <Filters/>
            <Filters/>
            <Filters/>
            <h4>{idea.price + " $"}</h4>
            <div className="bg-green-300">
                <p>buy it!!!</p>
            </div>
        </div>
    );
}