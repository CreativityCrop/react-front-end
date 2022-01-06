import { Outlet } from 'react-router-dom';

import AuthProvider from '../AuthProvider';

export default function BuyView() {

    return (
        <div id="buy-view">
            <AuthProvider/>
            <Outlet/>
        </div>
    );
}