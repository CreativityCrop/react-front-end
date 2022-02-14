import { Outlet } from 'react-router-dom';

import HottestIdeas from '../idea/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view">
            <div id="whole-container" className="flex flex-row ml-24 md:flex-col md:ml-3 md:w-64 sm:flex-col sm:ml-2">
                <div className="sm:order-2"><Outlet/></div>
                <div className="w-52 hidden xl:block h-fit -mt-[6.51rem] py-6 px-4 bg-gradient-to-b from-red-200
                md:w-[46rem] md:mt-0 sm:w-[23.4rem] sm:order-1 sm:mt-0">
                    <h1 className="text-center text-2xl mb-3">Hottest ideas right now!</h1>
                    <HottestIdeas className="md:flex sm:flex md:overflow-auto sm:overflow-auto md:space-x-3 sm:space-x-3"/>
                </div>
            </div>
            
        </div>
    );
}

// className={props.homepage===undefined ? "space-y-3 ml-4 mt-3" : "flex flex-row space-x-3 ml-4 mt-3"}