import { Outlet } from 'react-router-dom';

import HottestIdeas from '../idea/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view">
            <div id="whole-container" className="flex flex-row ml-24">
                <Outlet/>
                <div className="ml-4 w-52 h-fit -mt-[6.51rem] py-6 px-4 bg-gradient-to-b from-red-200">
                    <h1 className="text-center text-2xl">Hottest ideas right now!</h1>
                    <HottestIdeas className="space-y-3 ml-4 mt-3"/>
                </div>
            </div>
            
        </div>
    );
}

// className={props.homepage===undefined ? "space-y-3 ml-4 mt-3" : "flex flex-row space-x-3 ml-4 mt-3"}