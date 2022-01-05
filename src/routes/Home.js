import { verifyToken } from '../AuthAPI';
import { useEffect } from 'react'
import FirstSection from "../homepage/FirstSection";

export default function Home() {

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div>
            <FirstSection/>
        </div>
    );
}