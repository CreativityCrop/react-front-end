import { Outlet } from 'react-router-dom';
import AuthProvider from '../AuthAPI';

import HottestIdeas from '../idea/HottestIdeas';

export default function BuyView() {

    return (
        <div id="buy-view" className="flex flex-row md:flex-col sm:flex-col select-none w-fit">
            <AuthProvider/>
            <div className="sm:order-2 bg-maxbluepurple xl:min-w-[46rem] xl:min-h-[46rem] p-3 ">
                <Outlet/>
            </div>
        </div>
    );
}

// className={props.homepage===undefined ? "space-y-3 ml-4 mt-3" : "flex flex-row space-x-3 ml-4 mt-3"}