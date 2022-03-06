import { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import AuthProvider, { MAIN_API_URL, getToken, removeToken, AuthContext } from '../../AuthAPI';

import Idea from '../../idea/Idea';

export default function BuyIdea() {
    const [, setAuthContext] = useContext(AuthContext);
    const params = useParams();
    const [idea, setIdea] = useState({});
    const navigate = useNavigate();

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
                    navigate("/login");
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
    }, [params.ideaID, setAuthContext, navigate]);

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
            {ideaEntry()}
            <Outlet/>
        </div>
    );
}