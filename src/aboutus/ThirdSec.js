import Sponsors from "./Sponsors";

export default function ThirdSec(){
    return(
            <div className="p-6 bg-jasmine">
                <h1 className="mb-7 text-3xl text-center">Our Sponsors</h1>
                <div className="flex flex-row gap-4 justify-center sm:grid grid-cols-2 sm:space-x-0 sm:ml-6">
                    <Sponsors/>
                    <Sponsors/>
                    <Sponsors/>
                    <Sponsors/>
                    <Sponsors/>
                </div>
            </div>
    );
}