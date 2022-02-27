import { Outlet, NavLink, useLocation } from 'react-router-dom';
import HottestIdeas from '../idea/HottestIdeas';

export default function Marketplace() {
    const location = useLocation();
    console.log(location);
    return (
        <div id="marketplace" className="mt-5 xl:mt-10 mb-20 flex flex-col max-w-fit m-auto">
            {/* <div className="max-w-fit block xl:hidden py-6 px-4 bg-gradient-to-b from-yankeesblue
                md:mt-4 sm:mt-3">
                    <h1 className="text-center text-white text-2xl mb-3">Hottest ideas right now!</h1>
                    <HottestIdeas className="max-w-fit md:flex sm:flex md:overflow-auto sm:overflow-auto md:space-x-3 sm:space-x-3"/>
            </div> */}

        <div className="flex flex-col xl:flex-row">
            <div className="order-2 xl:order-1 m-auto xl:ml-24">
                <div className="flex flex-row">
                    <NavLink
                        className={({ isActive }) => isActive 
                        ? "text-white bg-maxbluepurple py-4 px-6 block hover:text-slate-200 focus:outline-none border-b-2 font-normal text-lg border-maxbluepurple hover:transition duration-300"
                        : "text-gray-600 bg-jasmine hover:text-amber-800 opacity-80 py-4 px-3 h-14 mt-2 block focus:outline-none hover:opacity-100 hover:transition duration-300"}
                        to="/marketplace/buy"
                    >
                        Buy
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => isActive 
                        ? "text-white bg-maxbluepurple py-4 px-6 block hover:text-slate-200 focus:outline-none border-b-2 font-medium text-lg border-maxbluepurple hover:transition duration-300"
                        : "text-gray-600 bg-jasmine hover:text-amber-800 opacity-80 py-4 px-3 h-14 mt-2 block focus:outline-none hover:opacity-100 hover:transition duration-300"}
                        to="/marketplace/sell"
                    >
                        Sell
                    </NavLink>
                </div>
                <Outlet/>
            </div>
            
            {location.pathname==='/marketplace/buy' && <HottestIdeas className="bg-gradient-to-b from-yankeesblue xl:via-yankeesblue"/>}
        </div>
        </div>
    );
}