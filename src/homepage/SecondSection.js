import TextHolder from "./TextHolder";

export default function SecondSection(){
    return (
        <div className="bg-slate-400 mt-28 select-none">
            <div className="flex flex-row">
                <div id="Buy an idea" className="grid grid-cols-6 bg-purple-300 w-96">
                    <TextHolder 
                        title="Buy an idea"
                        desc="you browse ideas for selling and depending on the description
                        you have the option to buy it"
                    />
                </div>
                <div id="Sell an idea" className="grid grid-cols-6 w-72">
                    <div>
                        <p>img</p>
                    </div>
                    <div className="w-52">
                        <h1>Sell an idea</h1>
                        <h3>you have an awesome idea that you want to sell on
                            the marketplace for others to buy</h3>
                    </div>
                </div>
            </div>
            <div id="Register" className="grid grid-cols-10 w-72 bg-green-300">
                <TextHolder 
                        title="have/need an idea?"
                        desc="join our community by clicking this fun button down below!"
                    />
            </div>
        </div>
    );
}