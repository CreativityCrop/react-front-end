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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
                setLoading(false);
                document.title = response.data.title + " - Buy - CreativityCrop";
            })
            .catch((err) => {
                setLoading(false);
                if(err.response?.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (err.response) {
                    toast.error(err.response.data.detail.msg);
                }
                else if (err.request) {
                    // client never received a response, or request never left
                    setError({title: "Network error!", msg: "Please check your connection."});
                }
                else {
                    setError({title: "Unknown error!", msg: "Please try again."});
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
        <div id="buy-idea" className="border-4 border-maxbluepurple">
            <AuthProvider/>
            { loading && <p className="text-white text-center text-lg">Loading...</p> }
            {
                error &&
                <div className="text-white">
                    <h1>{error.title}</h1>
                    <p>{error.msg}</p>
                </div>
            }
            {!loading && !error && ideaEntry()}
            <Outlet/>
        </div>
    );
}