import { useState, useEffect } from 'react';
import { MAIN_API_URL } from '../AuthAPI';
import axios from 'axios';

import SmallIdea from "./SmallIdea";

export default function HottestIdeas(props) {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = async () => {
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
                title={idea.title}
                imgUrl={idea.image_url}
                likes={idea.likes}
            />
        );
    });

    return (
        <div className={props.homepage===undefined ? "space-y-3 ml-4 mt-3" : "flex flex-row space-x-3 ml-4 mt-3"} >
            {listIdeas}
        </div>
    );
}