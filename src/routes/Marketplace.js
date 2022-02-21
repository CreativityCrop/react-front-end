import { Outlet, NavLink } from 'react-router-dom';
import HottestIdeas from '../idea/HottestIdeas';

export default function Marketplace() {

    return (
        <div id="marketplace" className="mb-20">
            <div className="block xl:hidden py-6 px-4 bg-gradient-to-b from-yankeesblue
                md:mt-4 sm:mt-3">
                    <h1 className="text-center text-white text-2xl mb-3">Hottest ideas right now!</h1>
                    <HottestIdeas className="md:flex sm:flex md:overflow-auto sm:overflow-auto md:space-x-3 sm:space-x-3"/>
            </div>
            <div className="flex flex-col ml-24 md:ml-3 sm:ml-5">
                <div className="flex flex-row mt-10 md:mt-0 sm:mt-0">
                <NavLink
                    className={({ isActive }) => isActive 
                    ? "text-white bg-maxbluepurple py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-normal text-lg border-maxbluepurple hover:transition duration-300"
                    : "text-gray-600 bg-jasmine opacity-80 py-2 px-3 h-14 mt-2 block focus:outline-none hover:opacity-100 hover:transition duration-300"}
                    to="/marketplace/buy"
                >
                    Buy
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive 
                    ? "text-white bg-maxbluepurple py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium text-lg border-maxbluepurple hover:transition duration-300"
                    : "text-gray-600 bg-jasmine opacity-80 py-2 px-3 h-14 mt-2 block focus:outline-none hover:opacity-100 hover:transition duration-300"}
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