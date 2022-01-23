import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthProvider, { MAIN_API_URL } from '../../AuthAPI';
import axios from 'axios';

import Idea from '../../idea/Idea';

export default function IdeasForSale() {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
    const [ideas, setIdeas] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const cat = query.get("cat");
    
    useEffect(() => {
        const loadIdeas = async (cat) => {
            let url;
            if(cat !== null) {
                console.log(cat);
                url = MAIN_API_URL + `/ideas/get?cat=${cat}`;
            }
            else {
                url = MAIN_API_URL + `/ideas/get`;
            }
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            setIdeas(response.data);
        }
        loadIdeas(cat);
    },[end, start, cat]);

    

    const listIdeas = ideas.map((idea) => {
        return (
            <Idea
                listView={true}
                key={idea.id}
                id={idea.id}
                imgUrl={idea.image_url}
                title={idea.title}
                shortDesc={idea.short_desc}
                categories={idea.categories}
                price={idea.price}
                likes={idea.likes}
            />
        );
    });

    return (
        <div id="ideas-list" className="border-4 p-3 min-w-[46rem] min-h-max">
            <AuthProvider/>
            {listIdeas}
        </div>
    );
}