import HottestIdeas from "../idea/HottestIdeas";

export default function ThirdSection() {
    return(
        <div className="select-none p-4">
            <h1 className="text-3xl mb-5 text-center">Hottest Ideas right now!</h1>
            <div className="m-auto">
                <HottestIdeas className="flex flex-nowrap xl:place-content-center gap-4 overflow-auto relative"/>
            </div>
        </div>
    );
}