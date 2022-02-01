import Idea from '../../idea/Idea';
import { useState, useEffect } from 'react';
import { MAIN_API_URL, getToken } from '../../AuthAPI';
import axios from 'axios';

export default function BoughtIdeasList() {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [ideas, setIdeas] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    // Put this somewhere to fix bug when loading new ideas scrolls to top bruh
    // document.getElementById('bought-ideas-list').scrollIntoView();

    useEffect(() => {
        const loadIdeas = async () => {
            const response = await axios.get(MAIN_API_URL + `/account/ideas/bought?page=${page}`, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            setLoading(false);
            setIdeas((prevIdeas) => [...prevIdeas, ...response.data.ideas]);
            if(response.data.countLeft > 0) {
                setHasMore(true);
            }
            else {
                setHasMore(false);

            }
        }
        loadIdeas();
    }, [page]);

    const listIdeas = ideas.map((idea) => {
        return (
            <Idea
                listView={true}
                boughtView={true}
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
            />
        );
    });

    return(
        <div id="bought-ideas-list" className="border-4 p-3 min-w-[46rem] min-h-max">
            <div className="w-full h-16 bg-purple-200">
                <h1 className="text-3xl p-2">Your Bought Ideas</h1>
            </div>
            {loading && "Loading..."}
            {listIdeas}
            {hasMore&&<button className="text-lg ml-[19rem] pb-1" onClick={() => setPage((prevPage) => prevPage + 1)}>Load more</button> }
        </div>
    );
}