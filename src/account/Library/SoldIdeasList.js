import Idea from '../../idea/Idea';
import { useState, useEffect } from 'react';
import { MAIN_API_URL, getToken } from '../../AuthAPI';
import axios from 'axios';


export default function SoldIdeasList() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = async () => {
        const response = await axios.get(MAIN_API_URL + "/account/ideas/sold", {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        setIdeas(response.data);
    }

    const listIdeas = ideas.map((idea) => {
        return (
            <Idea
                key={idea.id}
                id={idea.id}
                title={idea.title}
                categories={idea.categories}
                price={idea.price}
            />
        );
    });

    return(
        <div id="sold-ideas" className="border-4 border-t-0 p-3 min-w-[46rem] min-h-max">
            <div className="w-full h-16 bg-green-200">
                <h1 className="text-3xl p-2">Your Sold Ideas</h1>
            </div>
            {listIdeas}
            <button onClick={(e) => e.preventDefault}>Load more</button>
        </div>
    );
}