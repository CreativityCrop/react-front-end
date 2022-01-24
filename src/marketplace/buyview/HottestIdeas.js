import { useState, useEffect } from 'react';
import { MAIN_API_URL } from '../../AuthAPI';
import axios from 'axios';

import SmallIdea from "../../idea/SmallIdea";

export default function HottestIdeas() {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = async (cat) => {
        const response = await axios.get(MAIN_API_URL + "/ideas/get-hottest", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        setIdeas(response.data);
    }

    const listIdeas = ideas.map((idea) => {
        return (
            <SmallIdea
                key={idea.id}
                id={idea.id}
                imgUrl={idea.image_url}
                title={idea.title}
                likes={idea.likes}
            />
        );
    });

    return (
        <div className="ml-4 w-52 -mt-[6.51rem] pt-6 px-4 bg-red-200">
                <h1 className="text-center text-2xl">Hottest ideas right now!</h1>
            <div className="space-y-3 ml-4 mt-3">
                {listIdeas}
            </div>
        </div>
    );
}