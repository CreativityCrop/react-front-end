import { useState, useEffect } from 'react';
import { MAIN_API_URL } from '../AuthAPI';
import axios from 'axios';

import SmallIdea from "./SmallIdea";

// Component for the Hottest Ideas collumn/row
export default function HottestIdeas(props) {
    const [ideas, setIdeas] = useState(null);
    const [error, setError] = useState();

    // side effect to load list of ideas
    useEffect(() => {
        axios.get(MAIN_API_URL + "/ideas/get-hottest", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then((response) => {
            setIdeas(response.data.ideas);
        })
        .catch((err) => {
            if (err.response) {
                setError(err.response.data.detail);
            }
            else if (err.request) {
                // client never received a response, or request never left
                setError({title: "Network error!", msg: "Please check your connection."});
            }
            else {
                setError({title: "Unknown error!", msg: "Please try again."});
            }
        });
    }, []);

    const listIdeas = ideas?.map((idea) => {
        return (
            <SmallIdea
                key={idea.id}
                id={idea.id}
                title={idea.title}
                imgUrl={idea.imageURL}
                likes={idea.likes}
            />
        );
    });

    // style is different on homepage
    if(props.homepage) {
        return(
            <div className="select-none p-4">
                <h1 className="text-3xl mb-5 text-center">Hottest Ideas right now!</h1>
                <div className="m-auto">
                    <div className="flex flex-nowrap xl:place-content-center gap-4 overflow-auto relative">
                        {ideas && listIdeas}
                        {
                            error && <div className="text-yankeesblue text-center">
                                <h1>{error.title}</h1>
                                <p>{error.msg}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={"order-1 xl:order-2 xl:w-48 p-4 xl:flex xl:flex-col xl:justify-center xl:items-center xl:h-fit xl:-mt-10 " + props.className}>
            <h1 className="text-center text-slate-300 text-2xl mt-4 mb-5">Hottest ideas<br className='hidden xl:block'/> right now!</h1>
            <div className="md:flex sm:flex md:overflow-auto sm:overflow-auto gap-3">
                {ideas && listIdeas}
                {
                    error && <div className="text-white">
                        <h1>{error.title}</h1>
                        <p>{error.msg}</p>
                    </div>
                }
            </div>
        </div>
    );
}