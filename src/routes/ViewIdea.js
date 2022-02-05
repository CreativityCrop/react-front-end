import { React, useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

import AuthProvider, { getToken, MAIN_API_URL } from '../AuthAPI';

import Idea from '../idea/Idea';

export default function ViewIdea() {
    const params = useParams();
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
        document.title = response.data.title + " - CreativityCrop";
    }

    const ideaEntry = () => {
        return <Idea
                key={idea.id}
                id={idea.id}
                imgUrl={idea.image_url}
                title={idea.title}
                shortDesc={idea.short_desc}
                longDesc={idea.long_desc}
                categories={idea.categories}
                files={idea.files}
                price={idea.price}
                likes={idea.likes}
        />;
    }

    return(
        <div id="ideas-list" className="border-4 mt-12 p-3">
            <AuthProvider/>
            {ideaEntry()}
            <Outlet/>
        </div>
    );
}