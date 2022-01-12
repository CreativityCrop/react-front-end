import Bought from "./Bought";
import Sold from "./Sold";

export default function Dashboard(){
    return(
        <div className="mt-14 select-none">
            <div id="holder-of-the-acc" className="flex flex-row mb-4">
                <div id="left" className="w-44 h-44 mr-4 bg-slate-300">
                    <p>img</p>
                </div>
                <div id="middle" className="mr-4 mt-2">
                    <div className="flex flex-row mb-3">
                        <div className="border-4 w-60 h-10">
                            <p>Username</p>
                        </div>
                        <div className="ml-3 w-28 h-10 bg-green-200 hover:bg-purple-200">
                            <p>log out</p>
                        </div>
                        <div className="ml-3 w-10 h-10 bg-green-200 hover:bg-purple-200">
                            <p>S</p>
                        </div>
                    </div>
                    <div className="border-4 w-auto h-28">
                        <p>short bio</p>
                    </div>
                </div>
                <div id="right" className="w-56 mt-7 text-center">
                    <h3 className="text-2xl mb-4">Don't know where to start?</h3>
                    <div className="w-44 h-9 ml-7 bg-green-200 hover:bg-purple-200">
                        <p className="pt-1 text-lg text-center">Read the manual!</p>
                    </div>
                </div>
            </div>
            <div id="Library" className="w-auto">
                <div className="pt-2 h-14  text-center bg-red-200">
                    <h1 className="text-3xl">Library Overview</h1>
                </div>
                <div id="Your bought ideas">
                    <div className="ml-[69px] w-5/6 border-x-4 border-b-4">
                        <div className="w-full h-16 bg-purple-200">
                            <h1 className="text-3xl p-2">Your Bought Ideas</h1>
                        </div>
                       <Bought/>
                       <Bought/>
                    </div>
                </div>
                <div id="Your sold ideas">
                    <div className="ml-[69px] w-5/6 border-x-4 border-b-4">
                        <div className="w-full h-16 bg-green-200">
                            <h1 className="text-3xl p-2">Your Sold Ideas</h1>
                        </div>
                       <Sold/>
                       <Sold/>
                    </div>
                </div>
            </div>
        </div>
    );
}