import Idea from '../../idea/Idea';
import { useState, useEffect } from 'react';
import { MAIN_API_URL, getToken } from '../../AuthAPI';
import axios from 'axios';

export default function BoughtIdeasList() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = async () => {
        const response = await axios.get(MAIN_API_URL + "/account/ideas/bought", {
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
                shortDesc={idea.short_desc}
                longDesc={idea.long_desc}
                categories={idea.categories}
                price={idea.price}
            />
        );
    });

    return(
        <div id="" className="border-4 p-3 min-w-[46rem] min-h-max">
            <div className="w-full h-16 bg-purple-200">
                <h1 className="text-3xl p-2">Your Bought Ideas</h1>
            </div>
            {listIdeas}
            <button onClick={(e) => e.preventDefault}>Load more</button>
        </div>
    );
}