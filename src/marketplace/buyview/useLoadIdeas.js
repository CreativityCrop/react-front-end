import { useEffect, useState } from 'react';
import { MAIN_API_URL } from '../../AuthAPI';
import axios from 'axios';

export default function useLoadIdeas(pageNumber, category) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setIdeas([]);
    }, [category]);
    
    useEffect(() => {
        setLoading(true);
        setError(false);

        let url, cancel;
        if(category !== null) {
            url = MAIN_API_URL + `/ideas/get?page=${pageNumber}&cat=${category}`;
        }
        else {
            url = MAIN_API_URL + `/ideas/get?page=${pageNumber}`;
        }

        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            cancelToken: new axios.CancelToken( c=> cancel = c)
        }).then( (response) => {
            setIdeas(prevIdeas => {
                return [...prevIdeas, ...response.data.ideas];
            })
            setHasMore(response.data.countLeft > 0);
            setLoading(false);
        }).catch( (err) => {
            if(axios.isCancel(err)) return;
            setLoading(false);
            setError(true);
        });
        return () => cancel();
    },[pageNumber, category]);

    return {loading, error, ideas, hasMore};
}