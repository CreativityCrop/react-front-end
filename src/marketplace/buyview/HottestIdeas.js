import SmallIdea from "../../idea/SmallIdea";

export default function HottestIdeas() {
    return (
        <div className="ml-4 w-52 -mt-[6.51rem] pt-6 px-4 bg-red-200">
                <h1 className="text-center text-2xl">Hottest ideas right now!</h1>
            <div className="space-y-3 ml-4 mt-3">
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
            </div>
        </div>
    );
}