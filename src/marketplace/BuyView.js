import { Outlet } from 'react-router-dom';

import HottestIdeas from './buyview/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view">
            <div className="flex flex-row my-5">
                    <div className="mr-4">
                        <h1 className="text-2xl w-36 mt-2 text-center">Buy an idea</h1>
                    </div>
                    <div className="break-words w-[23rem]">
                        <p className="text-lg">browse ideas up for sell and decide which one you need right now!</p>
                    </div>
            </div>
            
            <div id="whole-container" className="flex flex-row ml-24">
                <Outlet/>
                <HottestIdeas/>
            </div>
            
        </div>
    );
}