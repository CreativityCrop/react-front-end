import { React, useState, useEffect, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

import AuthProvider, { MAIN_API_URL, getToken, removeToken, AuthContext } from '../AuthAPI';

import Idea from '../idea/Idea';

export default function ViewIdea() {
    const [, setAuthContext] = useContext(AuthContext);
    const params = useParams();
    const [idea, setIdea] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(MAIN_API_URL + "/ideas/get/" + params.ideaID, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                setIdea(response.data);
                document.title = response.data.title + " - CreativityCrop";
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (err.response) {
                    // console.log(err);
                    setError(err.response.data.detail);
                }
                else if (err.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }
            });
    }, [params.ideaID, setAuthContext]);

    

    const ideaEntry = () => {
        return <Idea
                key={idea.id}
                id={idea.id}
                imgUrl={idea.imageURL}
                title={idea.title}
                shortDesc={idea.shortDesc}
                longDesc={idea.longDesc}
                boughtView={idea.longDesc}
                categories={idea.categories}
                files={idea.files}
                price={idea.price}
                likes={idea.likes}
        />;
    }

    return(
        <div id="ideas-list" className="w-9/12 m-auto mt-12 mb-20 flex justify-center p-3 md:p-4 xl:p-6 bg-maxbluepurple">
            <AuthProvider/>
            {idea && ideaEntry()}
            {
                error && <div>
                    <h1>{error.title}</h1>
                    <p>{error.msg}</p>
                </div>
            }
            <Outlet/>
        </div>
    );
}