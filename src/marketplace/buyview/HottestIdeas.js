

export default function HottestIdeas() {
    return (
        <div className="ml-4 w-52 bg-red-200">
            <div className="ml-4 my-3 w-3/4 break-words">
                <h1 className="text-center text-2xl">Hottest ideas right now!</h1>
            </div>
            <div className="space-y-3 ml-8">
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
            </div>
        </div>



        
    );
}

function SmallIdea() {
    return(
        <div className="w-36 h-36 bg-slate-200">
            <p>img</p>
        </div>
    );
}