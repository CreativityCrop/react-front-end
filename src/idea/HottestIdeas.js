import { useState, useEffect } from 'react';
import { MAIN_API_URL } from '../AuthAPI';
import axios from 'axios';

import SmallIdea from "./SmallIdea";

export default function HottestIdeas(props) {
    const [ideas, setIdeas] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(MAIN_API_URL + "/ideas/get-hottest", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((response) => {
            setIdeas(response.data.ideas);
        })
        .catch((err) => {
            if (err.response) {
                setError(err.response.data.detail);
            }
            else if (err.request) {
                // client never received a response, or request never left
            }
            else {
                // anything else
            }        
        });
    }, []);

    const listIdeas = ideas?.map((idea) => {
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
            {ideas && listIdeas}
            {
                error && <div>
                    <h1>{error.title}</h1>
                    <p>{error.msg}</p>
                </div>
            }
        </div>
    );
}