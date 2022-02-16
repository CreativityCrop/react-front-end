import { Outlet } from 'react-router-dom';

import HottestIdeas from '../idea/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view">
            <div id="whole-container" className="flex flex-row ml-24 md:flex-col md:ml-3 sm:flex-col sm:m-auto">
                <div className="sm:order-2"><Outlet/></div>
                <div className="hidden xl:flex flex-col justify-center items-center h-fit -mt-24 bg-gradient-to-b via-yankeesblue from-yankeesblue">
                    <h1 className="flex-none text-center text-2xl  mt-4 mb-3 text-slate-300">Hottest ideas right now!</h1>
                    <HottestIdeas className="md:flex sm:flex px-3 md:overflow-auto sm:overflow-auto gap-3"/>
                </div>
            </div>
            
        </div>
    );
}

// className={props.homepage===undefined ? "space-y-3 ml-4 mt-3" : "flex flex-row space-x-3 ml-4 mt-3"}