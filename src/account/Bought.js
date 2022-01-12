export default function Bought(){
    return(
        <div className="flex flex-row m-4 border-4">
            <div className="bg-slate-300 w-40 h-40 m-2">
                <p>img</p>
            </div>
            <div>
                <div className="mt-2 ml-2">
                    <h3 className="text-2xl">Idea title</h3>
                </div>
                <div className="p-2 w-[27rem]">
                    <p className="text-base">short description that ppl will 
                        understand what it is about but not giving away the main idea -
                        like a little teaser</p>
                </div>
                <div className="grid grid-cols-2">
                    <div className="w-48 h-10 bg-red-200">
                        <h3>$$$</h3>
                    </div>
                    <div className="w-48 h-10 bg-green-200 hover:bg-purple-200">
                        <h3 className="text-lg">view full</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}