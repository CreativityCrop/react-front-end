import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthProvider from '../../AuthAPI';

import Idea from '../../idea/Idea';
import useLoadIdeas from './useLoadIdeas';

export default function IdeasForSale() {
    const [pageNumber, setPageNumber] = useState(0);
    const query = new URLSearchParams(useLocation().search);
    const category = query.get("cat");

    useEffect(() => {
        setPageNumber(0);
        window.scrollTo(0, 0);
    }, [category])

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
        <div id="ideas-list" className="border-4 p-3 min-w-[46rem] min-h-[37rem]">
            <AuthProvider/>
            {listIdeas}
            {loading && "Loading..."}
            {error && "Error"}
        </div>
    );
}