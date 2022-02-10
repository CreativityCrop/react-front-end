import Sponsors from "./Sponsors";

export default function ThirdSec(){
    return(
        <div className="pt-4 pb-8 px-8 mt-6 mb-8 select-none bg-red-300">
            <h1 className="mb-4 text-3xl sm:text-center">Our Sponsors</h1>
            <div className="flex flex-row space-x-4 place-content-center
            sm:grid grid-cols-2 sm:space-x-0 sm:ml-6">
                <Sponsors/>
                <Sponsors/>
                <Sponsors/>
                <Sponsors/>
                <Sponsors/>
            </div>
        </div>
    );
}