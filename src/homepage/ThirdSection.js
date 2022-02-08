import HottestIdeas from "../idea/HottestIdeas";

export default function ThirdSection() {
    return(
        <div className="mt-8 select-none px-6 py-4 bg-red-300">
            <h1 className="text-3xl mb-5 text-center">Hottest Ideas right now!</h1>
            <HottestIdeas className="flex flex-row space-x-4 mx-4 mt-3 place-content-center overflow-auto sm:max-w-sm"/>
        </div>
    );
}