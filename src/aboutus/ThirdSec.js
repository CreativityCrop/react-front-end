import Sponsors from "./Sponsors";

export default function ThirdSec(){
    return(
        <div className="w-screen bg-jasmine xl:-ml-64">
            <div className="pb-8 px-8 pt-6 select-none">
                <h1 className="mb-7 xl:ml-[21.5rem] text-3xl sm:text-center">Our Sponsors</h1>
                <div className="flex flex-row space-x-4 place-content-center
                sm:grid grid-cols-2 sm:space-x-0 sm:ml-6">
                    <Sponsors/>
                    <Sponsors/>
                    <Sponsors/>
                    <Sponsors/>
                    <Sponsors/>
                </div>
            </div>
        </div>
    );
}