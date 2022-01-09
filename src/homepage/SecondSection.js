import Illustrations from "./Illustrations";

export default function SecondSection(){
    return (
        <div className="mt-32 select-none">
            <div className="flex flex-row">
                <div id="Buy an idea" className="grid grid-cols-2 bg-purple-300 w-auto p-6">
                    <Illustrations/>
                    <div className="w-52">
                        <h1 className="mb-3 text-3xl">Buy an idea</h1>
                        <h3>you browse ideas for selling and depending on the description
                        you have the option to buy it</h3>
                    </div>
                </div>
                <div id="Sell an idea" className="grid grid-cols-2 w-auto p-6 bg-cyan-400">
                    <div className="w-52">
                        <h1 className="mb-3 text-3xl">Sell an idea</h1>
                        <h3>you have an awesome idea that you want to sell on
                            the marketplace for others to buy</h3>
                    </div>
                    <Illustrations/>
                </div>
            </div>
            <div id="Register" className="grid grid-cols-2 w-auto bg-green-600 p-6">
                    <div className="bg-slate-300 w-80 h-auto ml-28">
                        <p>img</p>
                    </div>
                    <div className="w-80 ml-6">
                        <h1 className="text-3xl">Have/need an idea?</h1>
                        <h3 className="mb-3">join our community by clicking this fun button down below!</h3>
                        <div className="w-44 h-8 text-center bg-slate-400 hover:bg-purple-400">
                            <p>this is a button</p>
                        </div>
                    </div>
            </div>
        </div>
    );
}