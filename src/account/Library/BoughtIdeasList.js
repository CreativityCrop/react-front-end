import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MAIN_API_URL, getToken, removeToken, AuthContext } from '../../AuthAPI';
import axios from 'axios';

import Idea from '../../idea/Idea';

export default function BoughtIdeasList() {
    const [, setAuthContext] = useContext(AuthContext);

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [ideas, setIdeas] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // Put this somewhere to fix bug when loading new ideas scrolls to top bruh
    // document.getElementById('bought-ideas-list').scrollIntoView();

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
        <div id="bought-ideas-list" className="border-4 border-black w-[46rem] min-h-max sm:w-[23.5rem]">
            <div className="w-full h-16 bg-maxbluepurple">
                <h1 className="text-3xl p-2">Your Bought Ideas</h1>
            </div>
            <div className="p-3 bg-yankeesblue">
            {loading && "Loading..."}
            {listIdeas}
            {
                listIdeas.length===0 &&
                <p className="text-center text-lg">You haven't bought any ideas yet! Go buy some at the <Link className="text-blue-400" to="/marketplace/buy">Marketplace</Link>.</p>
            }
            {
                error && <div>
                    <h1>{error.title}</h1>
                    <p>{error.msg}</p>
                </div>
            }
            {hasMore&&<button className="text-lg ml-[19rem]" onClick={() => setPage((prevPage) => prevPage + 1)}>Load more</button> }
            </div>
        </div>
    );
}