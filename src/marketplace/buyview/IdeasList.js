import { React, useState, useEffect } from 'react';
import AuthProvider, { MAIN_API_URL } from '../../AuthAPI';
import axios from 'axios';

import Idea from '../../idea/Idea';

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
        <div id="ideas-list">
            <div className="flex flex-row my-5">
                <div className="mr-4 bg-green-200">
                    <h1 className="text-2xl w-36 mt-2 text-center">Buy an idea</h1>
                </div>
                <div className="break-words w-[23rem]">
                    <p className="text-xl">browse ideas up for sell and decide which one you need right now!</p>
                </div>
            </div>
            <AuthProvider/>
            {listIdeas}
        </div>
    );
}