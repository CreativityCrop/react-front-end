import { Outlet } from 'react-router-dom';
import AuthProvider from '../AuthAPI';

import HottestIdeas from '../idea/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view" className="flex flex-row md:flex-col sm:flex-col select-none w-fit">
            <AuthProvider/>
            <div className="sm:order-2 bg-maxbluepurple p-4 ">
                <Outlet/>
            </div>
            {/* <div className="hidden xl:flex flex-col justify-center items-center h-fit -mt-24 bg-gradient-to-b via-yankeesblue from-yankeesblue">
                <h1 className="flex-none text-center text-2xl  mt-4 mb-3 text-slate-300">Hottest ideas right now!</h1>
                <HottestIdeas className="sticky md:flex sm:flex px-3 md:overflow-auto sm:overflow-auto gap-3"/>
            </div> */}
        </div>
    );
}

// className={props.homepage===undefined ? "space-y-3 ml-4 mt-3" : "flex flex-row space-x-3 ml-4 mt-3"}