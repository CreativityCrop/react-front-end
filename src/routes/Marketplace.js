import { Outlet, NavLink } from 'react-router-dom';

export default function Marketplace() {

    return (
        <div id="marketplace">
            <div className="flex flex-col ml-24 md:ml-3 sm:ml-2">
                <div className="flex flex-row mt-10 md:mt-8 sm:mt-5">
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