import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AuthProvider from '../../AuthAPI';
import useLoadIdeas from './useLoadIdeas';
import Idea from '../../idea/Idea';

// Component for listing ideas for sale
export default function IdeasForSale() {
    const [pageNumber, setPageNumber] = useState(0);
    const query = new URLSearchParams(useLocation().search);
    const category = query.get("cat");

    // side effect that resets page number if a category is selected
    useEffect(() => {
        setPageNumber(0);
        window.scrollTo(0, 0);
    }, [category])

    // custom hook for loading ideas while scrolling
    const {
        ideas,
        loading,
        error,
        hasMore
    } = useLoadIdeas(pageNumber, category);

    const observer = useRef();
    const lastIdeaElement = useCallback( node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                //console.log("visible");
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        if(node) observer.current.observe(node);
    }, [loading, hasMore,]);
    
    const listIdeas = ideas.map((idea, index) => {
        return (
            <Idea
                listView={true}
                boughtView={false}
                key={idea.id}
                innerRef={ideas.length === index + 1 ? lastIdeaElement : undefined}
                id={idea.id}
                imgUrl={idea.imageURL}
                title={idea.title}
                shortDesc={idea.shortDesc}
                categories={idea.categories}
                price={idea.price}
                likes={idea.likes}
            />
        );
    });

    return (
        <div id="ideas-list" className="flex flex-col gap-5 border-4 border-maxbluepurple">
            <AuthProvider/>
            { listIdeas }
            { loading && <p className="text-white sm:pr-96">Loading...</p> }
            { error && <p className="text-white">Error! Please refresh, if problem persists contact us!</p> }
            { ideas.length===0 && !error && !loading && <p className="text-white">No ideas found based on your criteria.</p> }
        </div>
    );
}