import { useNavigate } from 'react-router-dom';

import test from '../assets/test.png';

export default function SecondSection(){
    const navigate = useNavigate();
    return (
        <div id="second-section" className="bg-yankeesblue md:p-6 xl:p-6 sm:py-6">
            <div id="top" className="flex xl:flex-row sm:flex-col justify-center gap-5 m-auto">
                <div id="buy" className="flex flex-row w-auto p-4 xl:p-6 gap-4 md:basis-1/2 bg-jasmine hover:scale-105 transition">
                    <img alt="" src={test} className="bg-slate-300 xl:w-52 xl:h-60 w-32 h-52"/>
                    <div className="w-52 m-auto md:w-44">
                        <h1 className="mb-3 text-3xl">Buy an idea</h1>
                        <h3>you browse ideas for selling and depending on the description
                        you have the option to buy it</h3>
                    </div>
                </div>
                <div id="sell" className="flex flex-row w-auto p-4 xl:p-6 gap-4 md:basis-1/2 bg-jasmine hover:scale-105 transition">
                    <div className="w-52 m-auto md:w-44">
                        <h1 className="mb-3 text-3xl">Sell an idea</h1>
                        <h3>you have an awesome idea that you want to sell on
                            the marketplace for others to buy</h3>
                    </div>
                    <img alt="" src={test} className="bg-slate-300 xl:w-52 xl:h-60 w-32 h-52"/>
                </div>
            </div>
            <div id="bottom" className="flex sm:flex-col justify-center items-center gap-16 mt-6">
                <img alt="" src={test} className="w-60"/>
                <div className="w-72 xl:w-fit">
                    <h1 className="text-3xl mb-2 text-slate-200">Have/need an idea?</h1>
                    <h3 className="mb-3 text-slate-200">join our community by clicking this fun button down below!</h3>
                    <button className="w-44 h-8 text-center bg-blue-100 hover:bg-purple-400
                    hover:scale-105 hover:origin-bottom hover:-rotate-3 hover:drop-shadow-xl transition duration-150"
                            onClick={() => navigate("/register")}>
                        Register now!
                    </button>
                </div>
            </div>
        </div>
    );
}