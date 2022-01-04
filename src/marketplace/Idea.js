import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { fetchToken } from '../AuthAPI'
import axios from 'axios';

export default function Idea() {
    const params = useParams();
    const auth = fetchToken();
    const [result, setResult] = useState();
    
    
    
    useEffect(() => {
        const req = async () => {
            const response = await axios.get("http://localhost:8000/api/marketplace/buy/" + params.ideaID, {
                headers: {
                    "Token": auth,
                    "Content-Type": "application/json"
                }
            });
            setResult(response);
        }
        req();
    }, [params, auth]);
    return (
        <div>
            <h1>Idea # {params.ideaID}</h1>
            {JSON.stringify(result)}
        </div>
    );
}