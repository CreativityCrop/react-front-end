import { useNavigate } from 'react-router-dom';


export default function SecondSection(){
    const navigate = useNavigate();
    return (
        <div id="second-section" className="bg-yankeesblue md:p-6 xl:p-6 sm:py-6">
            <div id="top" className="flex xl:flex-row sm:flex-col justify-center gap-5 m-auto">
                <div
                    id="buy" 
                    className="flex flex-row w-auto p-4 xl:p-6 gap-4 md:basis-1/2 bg-jasmine hover:scale-105 xl:transition cursor-pointer"
                    onClick={() => navigate("/marketplace/buy")}
                >
                    <img alt="" src="./assets/Illustrations/buy.png" className="bg-slate-300 xl:w-52 xl:h-60 w-32 h-52 object-cover"/>
                    <div className="w-52 m-auto md:w-44">
                        <h1 className="mb-3 text-3xl">Buy an idea</h1>
                        <h3 className="text-sm">
                            Browse our marketplace full of wonderful ideas. You will see a short description outlining it in general.
                            After purchasing you will gain access to the long description, that will fully explain it to you how to apply it.
                        </h3>
                    </div>
                </div>
                <div
                    id="sell"
                    className="flex flex-row w-auto p-4 xl:p-6 gap-4 md:basis-1/2 bg-jasmine hover:scale-105 xl:transition cursor-pointer"
                    onClick={() => navigate("/marketplace/sell")}
                >
                    <div className="w-52 m-auto md:w-44">
                        <h1 className="mb-3 text-3xl">Sell an idea</h1>
                        <h3 className="text-sm">You have an idea but can't carry it out? Then why not make money from it? You've come to the right place - 
                            you can post your idea in the marketplace and if someone likes it, you'll get paid for it.
                        </h3>
                    </div>
                    <img alt="" src="./assets/Illustrations/sell.png" className="bg-slate-300 xl:w-52 xl:h-60 w-32 h-52 object-cover"/>
                </div>
            </div>
            <div id="bottom" className="flex sm:flex-col justify-center items-center gap-16 mt-6">
                <img alt="" src="./assets/Illustrations/lady.png" className="w-60"/>
                <div className="w-72 xl:w-fit">
                    <h1 className="text-3xl mb-2 text-slate-200">Have or need an idea?</h1>
                    <h3 className="mb-3 text-slate-200">Join our community by creating an account and start browsing!</h3>
                    <button className="w-44 h-8 text-center bg-jasmine hover:bg-amber-500
                    hover:scale-105 hover:origin-bottom hover:-rotate-3 hover:drop-shadow-xl transition duration-150"
                            onClick={() => navigate("/register")}>
                        Register now!
                    </button>
                </div>
            </div>
        </div>
    );
}