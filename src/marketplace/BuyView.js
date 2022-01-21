import { Outlet } from 'react-router-dom';

import HottestIdeas from './buyview/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view">
            <div id="whole-container" className="flex flex-row ml-24">
                <Outlet/>
                <HottestIdeas/>
            </div>
            
        </div>
    );
}