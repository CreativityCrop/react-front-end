import { useNavigate } from 'react-router-dom';

import test from '../assets/test.png';

export default function SecondSection(){
    const navigate = useNavigate();
    return (
        <div className='bg-yankeesblue w-screen xl:-ml-64'>
        <div id="second-section" className="mt-5 select-none xl:ml-64">
            <div id="top" className="flex xl:flex-row space-x-1 xl:ml-6 xl:pt-4 md:p-4 sm:p-[0.3rem] sm:flex-col sm:space-y-1 sm:space-x-0">
                <div id="buy" className="flex flex-row w-auto p-6 space-x-4 md:p-4 md:basis-1/2 bg-jasmine hover:scale-105 transition">
                    <div className="bg-slate-300 w-52 h-60 md:w-32 md:h-52">
                        <img alt="" src={test} />
                    </div>
                    <div className="w-52 m-auto md:w-44 md:mt-8">
                        <h1 className="mb-3 text-3xl">Buy an idea</h1>
                        <h3>you browse ideas for selling and depending on the description
                        you have the option to buy it</h3>
                    </div>
                </div>
                <div id="sell" className="flex flex-row w-auto p-6 space-x-4 md:p-4 md:basis-1/2 bg-jasmine hover:scale-105 transition">
                    <div className="w-52 m-auto md:w-44 md:mt-8">
                        <h1 className="mb-3 text-3xl">Sell an idea</h1>
                        <h3>you have an awesome idea that you want to sell on
                            the marketplace for others to buy</h3>
                    </div>
                    <div className="bg-slate-300 w-52 h-60 md:w-32 md:h-52">
                        <img alt="" src={test} />
                    </div>
                </div>
            </div>
            <div id="bottom" className="flex xl:flex-row sm:flex-col xl:space-x-16 md:space-x-16 sm:space-y-6 p-6">
                <div className="bg-slate-300 ml-36 md:ml-4 sm:ml-0">
                    <img alt="" src={test} className="w-60"/>
                </div>
                <div className="basis-1/2 m-auto">
                    <h1 className="text-3xl mb-2 text-slate-200">Have/need an idea?</h1>
                    <h3 className="mb-3 text-slate-200">join our community by clicking this fun button down below!</h3>
                    <button className="w-44 h-8 text-center bg-jasmine hover:bg-purple-400
                    hover:scale-105 hover:origin-bottom hover:-rotate-3 hover:drop-shadow-xl transition duration-150"
                            onClick={() => navigate("/register")}>
                        Register now!
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}