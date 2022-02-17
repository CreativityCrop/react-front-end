import { useState, useEffect, useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import AuthProvider, { MAIN_API_URL, getToken, removeToken, AuthContext } from '../../AuthAPI';

import Idea from '../../idea/Idea';

export default function BuyIdea() {
    const [, setAuthContext] = useContext(AuthContext);
    const params = useParams();
    const [idea, setIdea] = useState({});

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
                document.title = response.data.title + " - Buy - CreativityCrop";
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }            
            });
    }, [params.ideaID, setAuthContext]);

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

    return (
        <div id="ideas-list" className="border-2 p-3 w-[46rem] sm:w-[23.5rem] sm:ml-6">
            <AuthProvider/>
            {ideaEntry()}
            <Outlet/>
        </div>
    );
}