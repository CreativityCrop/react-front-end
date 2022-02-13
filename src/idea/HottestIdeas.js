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
        setIdeas(response.data.ideas);
    }

    const listIdeas = ideas.map((idea) => {
        return (
            <SmallIdea
                key={idea.id}
                id={idea.id}
                title={idea.title}
                imgUrl={idea.imageURL}
                likes={idea.likes}
            />
        );
    });

    return (
        <div className={props.className}>
            {listIdeas}
        </div>
    );
}