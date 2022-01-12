import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AuthProvider, { getToken, MAIN_API_URL } from '../../AuthAPI';

import Idea from '../../idea/Idea';

export default function IdeaBuy() {
    let params = useParams();
    const [idea, setIdea] = useState({});

    useEffect(() => {
        getIdea(params.ideaID);
    }, [params]);

    const getIdea = async (id) => {
        const response = await axios.get(MAIN_API_URL + "/ideas/get/" + id, {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        setIdea(response.data);
    }

    const ideaEntry = () => {
        return <Idea
                key={idea.id}
                id={idea.id}
                title={idea.title}
                shortDesc={idea.short_desc}
                categories={idea.categories}
                price={idea.price}
                likes={idea.likes}
        />;
    }

    return (
        <div>
            <AuthProvider/>
            {ideaEntry}
        </div>
    );
}