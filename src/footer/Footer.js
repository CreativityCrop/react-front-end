import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div id="footer" className="select-none mt-10 p-10 divide-y-2 bg-blue-400">
            <div className="grid grid-cols-3 mb-5">
                <div className="ml-11">
                    <h1 className="text-xl font-medium mb-2">Stay Connected</h1>
                    <div className="ml-3">
                        <h3 className="text-lg">this will be our business e-mail</h3>
                        <h3 className="text-lg">088 888 8888</h3>
                        <div className="flex flex-row space-x-4">
                            <p>fb</p>
                            <p>twi</p>
                            <p>ig</p>
                        </div>
                    </div>
                </div>
                <div className="ml-11">
                    <h1 className="mb-2 text-xl font-medium">About</h1>
                    <div className="ml-3 w-72 break-words">
                        <p>This project is the fruit of countless sleepless nights and child labor so pls give us 
                            money so we can go to collage and not starve to death ♡
                        </p>
                    </div>
                </div>
                <div className="ml-11">
                    <h1 className="mb-2 text-xl font-medium">Navigate</h1>
                    <div className="grid grid-cols-2 ml-2">
                        <div className="text-[1.05rem]">
                            <Link to="/">Homepage</Link>
                            <p></p>
                            <Link to="/marketplace">Marketplace</Link>
                            {/* <Link to="">Buy an idea</Link> */}
                            <p></p>
                            <Link to="/marketplace/sell">Sell an idea</Link>
                        </div>
                        <div className="-ml-14 text-[1.05rem]">
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
            <div className="flex flex-row space-x-8">
                <h1 className="text-left mx-10 mt-3">© { (new Date()).getFullYear()} CreativityCrop</h1>
                <Link to="/terms-conditions" className="mt-3">Terms and Conditions</Link>
                <Link to="/privacy-policy" className="mt-3">Privacy Policy</Link>
            </div>
        </div>
    );
}