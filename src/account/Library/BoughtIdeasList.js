import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MAIN_API_URL, getToken, removeToken, AuthContext } from '../../AuthAPI';
import axios from 'axios';

import Idea from '../../idea/Idea';

export default function BoughtIdeasList() {
    const [, setAuthContext] = useContext(AuthContext);
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [ideas, setIdeas] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        axios
            .get(MAIN_API_URL + `/account/ideas/bought?page=${page}`, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                setLoading(false);
                setIdeas((prevIdeas) => [...prevIdeas, ...response.data.ideas]);
                setHasMore(response.data.countLeft > 0);
            })
            .catch((err) => {
                setLoading(false);
                if(err.response?.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                    navigate("/login");
                }
                else if (err.response) {
                    setError(err.response.data.detail);
                }
                else if (err.request) {
                    // client never received a response, or request never left
                    setError("Network error! Please check your connection.");
                }
                else {
                    // anything else
                }
            });
    }, [page, setAuthContext, navigate]);

    const listIdeas = ideas.map((idea) => {
        return (
            <Idea
                listView={true}
                boughtView={true}
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
            />
        );
    });

    return(
        <div id="bought-ideas-list" className="xl:w-10/12 w-11/12 m-auto bg-yankeesblue">
            <h1 className="w-full h-16 bg-maxbluepurple text-white text-3xl p-2">Your Bought Ideas</h1>
            <div className="flex flex-col gap-6 px-5 py-6 border-4 border-maxbluepurple border-t-0 ">
                {loading && <p className="text-white text-center text-lg">Loading...</p>}
                {listIdeas}
                {
                    listIdeas.length===0 &&
                    <p className="text-white text-center text-lg">You haven't bought any ideas yet! <br/>Go buy some at the <Link className="text-maxbluepurple" to="/marketplace/buy">Marketplace</Link>.</p>
                }
                {
                    error &&
                    <div className="text-white">
                        <h1>{error.title}</h1>
                        <p>{error.msg}</p>
                    </div>
                }
                {
                    hasMore &&
                    <button
                        className="text-white text-center text-lg" 
                        onClick={() => setPage((prevPage) => prevPage + 1)}
                    >Load more</button>
                }
            </div>
        </div>
    );
}