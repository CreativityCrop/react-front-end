import SmallIdea from "../idea/SmallIdea";

export default function ThirdSection(){
    return(
        <div className="mt-8 select-none px-6 py-3 bg-red-300">
            <h1 className="text-3xl mb-5">Hottest Ideas right now!</h1>
            <div className="flex flex-row space-x-4 place-content-center pb-5">
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
            </div>
        </div>
    );
}