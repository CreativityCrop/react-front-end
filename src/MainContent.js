import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { verifyToken } from './AuthAPI';

export default function MainContent() {
    useEffect(() => {
        verifyToken();
    });

    return (
        <div className="flex flex-col items-center">
            <Outlet/>
        </div>
    );
}