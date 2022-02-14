import { Outlet, NavLink } from 'react-router-dom';
import HottestIdeas from '../idea/HottestIdeas';

export default function Marketplace() {

    return (
        <div id="marketplace">
            <div className="w-52 block xl:hidden h-fit -mt-[6.51rem] py-6 px-4 bg-gradient-to-b from-red-200
                md:w-[46rem] md:mt-4 md:ml-3 sm:w-[23.4rem] sm:order-1 sm:mt-3 sm:ml-2">
                    <h1 className="text-center text-2xl mb-3">Hottest ideas right now!</h1>
                    <HottestIdeas className="md:flex sm:flex md:overflow-auto sm:overflow-auto md:space-x-3 sm:space-x-3"/>
                </div>
            <div className="flex flex-col ml-24 md:ml-3 sm:ml-2">
                <div className="flex flex-row mt-10 md:mt-8 sm:mt-0">
                <NavLink
                    className={({ isActive }) => isActive 
                    ? "text-blue-500 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium text-lg border-blue-500"
                    : "text-gray-600 py-5 px-6 block hover:text-blue-500 focus:outline-none"}
                    to="/marketplace/buy"
                >
                    Buy
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive 
                    ? "text-blue-500 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium text-lg border-blue-500"
                    : "text-gray-600 py-5 px-6 block hover:text-blue-500 focus:outline-none"}
                    to="/marketplace/sell"
                >
                    Sell
                </NavLink>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}