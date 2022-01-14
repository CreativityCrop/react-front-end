import Idea from '../idea/Idea';

export default function Library() {
    return (
        <div id="Library" className="w-auto">
            <div className="pt-2 h-14  text-center bg-red-200">
                <h1 className="text-3xl">Library Overview</h1>
            </div>
            <div id="Your bought ideas">
                <div className="ml-[69px] w-5/6 border-x-4 border-b-4">
                    <div className="w-full h-16 bg-purple-200">
                        <h1 className="text-3xl p-2">Your Bought Ideas</h1>
                    </div>
                    <Idea  
                        key="387fe47af88f628f8f794d0436c9c874"
                        id="387fe47af88f628f8f794d0436c9c874"
                        title="Test"
                        shortDesc="Short desc"
                        longDesc="Short desc"
                        likes="2"
                    />
                    <Idea  
                        key="387fe47af88f628f8f794d0436c9c872"
                        id="387fe47af88f628f8f794d0436c9c874"
                        title="Test"
                        shortDesc="Short desc"
                        longDesc="Short desc"
                        likes="2"
                    />
                </div>
                
            </div>
            <div id="Your sold ideas">
                <div className="mb-4 ml-[69px] w-5/6 border-x-4 border-b-4">
                    <div className="w-full h-16 bg-green-200">
                        <h1 className="text-3xl p-2">Your Sold Ideas</h1>
                    </div>
                    <Idea  
                        key="387fe47af84f628f8f794d0436c9c874"
                        id="387fe47af88f628f8f794d0436c9c874"
                        title="Test"
                        shortDesc="Short desc"
                        likes="2"
                    />
                    <Idea  
                        key="387fe47af88f128f8f794d0436c9c872"
                        id="387fe47af88f628f8f794d0436c9c874"
                        title="Test"
                        shortDesc="Short desc"
                        likes="2"
                    />
                </div>
            </div>
        </div>
    );
}