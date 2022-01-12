import Filters from "../idea/Filter";
import Likes from "../idea/Likes";

export default function Bought(){
    return(
        <div className="flex flex-row m-4 border-4">
            <div className="bg-slate-300 w-40 h-40 m-2">
                <p>img</p>
            </div>
            <div>
                <div className="flex flex-row">
                    <div className="mt-1 ml-2">
                        <h3 className="text-2xl">Idea title</h3>
                    </div>
                    <Likes/>
                </div>
                <div className="ml-2 mt-1 mb-3 w-[30rem]">
                    <p className="text-base">short description that ppl will 
                        understand what it is about but not giving away the main idea -
                        like a little teaser</p>
                </div>
                <div className="flex flex-row space-x-3">
                    <Filters/>
                    <Filters/>
                    <Filters/>
                    <Filters/>
                    <Filters/>
                    <Filters/>
                </div>
                <div className="grid grid-cols-2 my-3 ml-2">
                    <div className="w-48 h-8 bg-red-200">
                        <h3 className="text-lg text-center">$$$</h3>
                    </div>
                    <div className="w-48 h-8 ml-12 bg-green-200 hover:bg-purple-200">
                        <h3 className="text-lg text-center">view full idea</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}