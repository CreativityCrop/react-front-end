// import TextHolder from "./TextHolder";

export default function SecondSection(){
    return (
        <div className="bg-slate-400 mt-32 select-none">
            <div className="flex flex-row">
                <div id="Buy an idea" className="grid grid-cols-2 bg-purple-300 w-auto p-6">
                    <div className="bg-slate-300 w-44 h-56">
                        <p>img</p>
                    </div>
                    <div className="w-52">
                        <h1>Buy an idea</h1>
                        <h3>you browse ideas for selling and depending on the description
                        you have the option to buy it</h3>
                    </div>
                </div>
                <div id="Sell an idea" className="grid grid-cols-2 w-auto p-6 bg-cyan-400">
                    <div className="bg-slate-300 w-44 h-56">
                        <p>img</p>
                    </div>
                    <div className="w-52">
                        <h1>Sell an idea</h1>
                        <h3>you have an awesome idea that you want to sell on
                            the marketplace for others to buy</h3>
                    </div>
                </div>
            </div>
            <div id="Register" className="grid grid-cols-5 w-72 bg-green-300 p-6">
                {/* <TextHolder 
                        title="have/need an idea?"
                        desc="join our community by clicking this fun button down below!"
                    /> */}
                    <div className="bg-slate-300 w-36 h-56">
                        <p>img</p>
                    </div>
                    <div className="w-52">
                        <h1>have/need an idea?</h1>
                        <h3>join our community by clicking this fun button down below!</h3>
                    </div>
            </div>
        </div>
    );
}