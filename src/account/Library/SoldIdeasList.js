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
        <div id="sold-ideas" className="border-4 border-t-0 p-3 w-[46rem] min-h-max sm:w-[23.5rem]">
            <div className="w-full h-16 bg-green-200">
                <h1 className="text-3xl p-2">Your Sold Ideas</h1>
            </div>
            {loading && "Loading..."}
            {listIdeas}
            {
                listIdeas.length===0 &&
                <p className="text-center text-lg">You haven't sold any ideas yet! Go sell some at the <Link className="text-blue-400" to="/marketplace/sell">Marketplace</Link>.</p>
            }
            {
                error && <div>
                    <h1>{error.title}</h1>
                    <p>{error.msg}</p>
                </div>
            }
            {hasMore&&<button className="text-lg ml-[19rem] pb-1" onClick={() => setPage((prevPage) => prevPage + 1)}>Load more</button> }
        </div>
    );
}