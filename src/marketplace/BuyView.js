import { Outlet } from 'react-router-dom';

import HottestIdeas from './buyview/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view">
            <Outlet/>
            <HottestIdeas/>
        </div>
    );
}