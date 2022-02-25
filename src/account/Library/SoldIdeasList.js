import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MAIN_API_URL, getToken, removeToken, AuthContext } from '../../AuthAPI';
import axios from 'axios';

import Idea from '../../idea/Idea';

export default function SoldIdeasList() {
    const [, setAuthContext] = useContext(AuthContext);

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [ideas, setIdeas] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        axios
            .get(MAIN_API_URL + `/account/ideas/sold?page=${page}`, {
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
                if(err.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (err.response) {
                    setError(err.response.data.detail);
                }
                else if (err.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }
            });
    }, [page, setAuthContext]);
    
    const listIdeas = ideas?.map((idea) => {
        return (
            <Idea
                listView={true}
                soldView={true}
                key={idea.id}
                id={idea.id}
                imgUrl={idea.imageURL}
                title={idea.title}
                categories={idea.categories}
                price={idea.price}
                likes={idea.likes}
                payoutStatus={idea.payoutStatus}
            />
        );
    });

    return(
        <div id="sold-ideas" className="xl:w-10/12 m-auto bg-yankeesblue">
            <h1 className="w-full h-16 bg-maxbluepurple text-white text-3xl p-2">Your Sold Ideas</h1>
            <div className="flex flex-col gap-4 px-4 py-10 border-4 border-maxbluepurple border-t-0 ">
                {loading && <p className="text-white text-center text-lg">Loading...</p>}
                {listIdeas}
                {
                    listIdeas.length===0 &&
                    <p className="text-white text-center text-lg">You don't thave any sold ideas yet! Go sell some at the <Link className="text-maxbluepurple" to="/marketplace/sell">Marketplace</Link>.</p>
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