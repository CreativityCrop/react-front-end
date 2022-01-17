import SmallIdea from "../buyview/SmallIdea";

export default function SubmitTutorial() {
    return (
        <div className="w-52 -mt-[6.14rem] ml-4 pt-6 pb-[3.8rem] px-4 bg-red-200">
            <h1 className="text-center text-2xl">Tutorial on how to fill in the form</h1>
            <div className="space-y-3 ml-4 mt-3">
                <SmallIdea/>
                <SmallIdea/>
                <SmallIdea/>
            </div>
        </div>
    );
}