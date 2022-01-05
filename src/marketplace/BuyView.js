import { verifyToken } from '../AuthAPI';
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

export default function BuyView() {

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="">
            <Outlet/>
        </div>
    );
}