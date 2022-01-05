import { verifyToken } from '../AuthAPI';
import { useEffect } from 'react'

export default function Aboutus() {

    useEffect(() => {
        verifyToken();
    }, []);
    
    return (
        <div>
            <h1>About us</h1>
        </div>
    );
}