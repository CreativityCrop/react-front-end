import { React, useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

import AuthProvider, { getToken, MAIN_API_URL } from '../../AuthAPI';

import Idea from '../../idea/Idea';

export default function BuyIdea() {
    const params = useParams();
    const [idea, setIdea] = useState({});

    useEffect(() => {
        getIdea(params.ideaID);
    }, [params]);

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    const getIdea = async (id) => {
        const response = await axios.get(MAIN_API_URL + "/ideas/get/" + id, {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        setIdea(response.data);
        document.title = response.data.title + " - Buy - CreativityCrop";
    }

    const ideaEntry = () => {
        return <Idea
                buyView={true}
                key={idea.id}
                id={idea.id}
                imgUrl={idea.imageURL}
                title={idea.title}
                shortDesc={idea.shortDesc}
                longDesc={idea.longDesc}
                categories={idea.categories}
                files={idea.files}
                price={idea.price}
                likes={idea.likes}
        />;
    }

    // this is to see the full idea dont get them mixed up plz - me to me
    return (
        <div id="ideas-list" className="border-4 p-3 min-w-[46rem]">
            <AuthProvider/>
            {ideaEntry()}
            <Outlet/>
        </div>
    );
}