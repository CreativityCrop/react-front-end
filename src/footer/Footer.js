import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div id="footer" className="shrink-0 select-none p-10 divide-y-2 bg-yankeesblue text-slate-300 md:p-6 sm:p-3 sm:pt-10 sm:pb-24">
            <div className="grid grid-cols-3 mb-5 sm:grid-cols-2">
                <div className="ml-11 md:ml-6 sm:ml-2">
                    <h1 className="text-xl font-medium mb-2">Stay Connected</h1>
                    <div className="ml-3 md:w-[11.7rem] break-words">
                        <h3 className="text-lg">contact@creativitycrop.tech</h3>
                        <h3 className="text-lg">088 888 8888</h3>
                    </div>
                </div>
                <div className="ml-11 md:-ml-5 sm:ml-0">
                    <h1 className="mb-2 text-xl font-medium">About</h1>
                    <div className="ml-3 w-72 break-words md:w-64 sm:w-44 sm:ml-2">
                        <p>Go to our "About Us" page to read up about our team and how our project came to life!
                        </p>
                    </div>
                </div>
                <div className="ml-11 md:ml-8 sm:ml-2 sm:col-span-2">
                    <h1 className="mb-2 text-xl font-medium">Navigate</h1>
                    <div className="grid grid-cols-2 ml-3">
                        <div className="text-[1.05rem]">
                            <Link to="/">Homepage</Link>
                            <p></p>
                            <Link to="/marketplace">Marketplace</Link>
                            {/* <Link to="">Buy an idea</Link> */}
                            <p></p>
                            <Link to="/marketplace/sell">Sell an idea</Link>
                        </div>
                        <div className="-ml-14 -mt-1 text-[1.05rem] md:ml-3 sm:ml-16">
                            <p></p>
                            <Link to="/about-us">About us</Link>
                            <p></p>
                            <Link to="/login">Login</Link>
                            <p></p>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-8 sm:space-x-1">
                <h1 className="text-left mx-10 mt-3 sm:mx-5">© { (new Date()).getFullYear()} CreativityCrop</h1>
                <Link to="/terms-conditions" className="mt-3">Terms and Conditions</Link>
                <Link to="/privacy-policy" className="mt-3">Privacy Policy</Link>
            </div>
        </div>
    );
}