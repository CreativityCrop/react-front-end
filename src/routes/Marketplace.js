import { Outlet, NavLink } from 'react-router-dom';

export default function Marketplace() {
        return (
        <div>
            <h1 className="text-center m-5">Marketplace</h1>

            <div className="flex flex-col sm:flex-row justify-center">
                <NavLink
                    className={({ isActive }) => isActive 
                    ? "text-blue-500 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium border-blue-500"
                    : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"}
                    to="/marketplace/buy"
                >
                    Buy
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive 
                    ? "text-blue-500 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium border-blue-500"
                    : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"}
                    to="/marketplace/sell"
                >
                    Sell
                </NavLink>
            </div>
            <Outlet/>
        </div>
    );
}