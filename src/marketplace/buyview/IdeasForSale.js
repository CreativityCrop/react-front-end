import Filters  from "../Filter";
import { React, useState, useEffect } from 'react';
import { getToken, MAIN_API_URL } from '../../AuthAPI'
import axios from 'axios';

export default function IdeasForSale() {
    const auth = getToken();
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        const req = async () => {
            const response = await axios.get(MAIN_API_URL + "/ideas/get", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            setIdeas(response.data);
        }
        req();
    }, [auth]);
 
    const listItems = ideas.map(function Idea(idea) {
        const categories = JSON.parse(idea.categories).categories.map((category) => {
            return <Filters key={category} category={category}/>
        });
        return (
            <div id="idea" className="bg-yellow-300 mb-20" key={idea.title}>
                <div className="w-20">
                    <img src="" alt=""/>
                </div>
                <h4>{idea.title}</h4>
                <h5 className="pt-3 pb-3">Short description</h5>
                <p>{idea.short_desc}</p>
                <div id="filters" className="grid grid-cols-10 gap-4">
                    {categories}
                </div>
                <h4>{idea.price + " $"}</h4>
                <div className="bg-green-300">
                    <p>buy it!!!</p>
                </div>
            </div>
        );
    });

    return (
        <div id="ideas-list">
            <h1>Ideas for sale</h1>
            {listItems}
        </div>
    );
}