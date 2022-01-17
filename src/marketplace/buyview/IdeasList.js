import { React, useState, useEffect } from 'react';
import AuthProvider, { MAIN_API_URL } from '../../AuthAPI';
import axios from 'axios';

import Idea from '../../idea/Idea';
import HottestIdeas from './HottestIdeas';

export default function IdeasForSale() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = async () => {
        const response = await axios.get(MAIN_API_URL + "/ideas/get", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        setIdeas(response.data);
    }

    const listIdeas = ideas.map((idea) => {
        return (
            <Idea
                listView={true}
                key={idea.id}
                id={idea.id}
                title={idea.title}
                shortDesc={idea.short_desc}
                categories={idea.categories}
                price={idea.price}
                likes={idea.likes}
            />
        );
    });

    return (
        <div id="ideas-list" className="border-4 p-3">
            <AuthProvider/>
            {listIdeas}
        </div>
    );
}