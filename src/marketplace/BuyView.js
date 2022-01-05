import { Outlet } from 'react-router-dom';

import AuthProvider from '../AuthProvider';

export default function BuyView() {

    return (
        <div>
            <AuthProvider/>
            <Outlet/>
        </div>
    );
}