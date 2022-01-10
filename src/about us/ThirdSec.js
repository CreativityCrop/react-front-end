import Sponsors from "./Sponsors";

export default function ThirdSec(){
    return(
        <div className="mt-16 mb-8 select-none bg-red-300">
            <h1>Our Sponsors</h1>
            <div className="flex flex-row space-x-4">
                <Sponsors/>
                <Sponsors/>
                <Sponsors/>
                <Sponsors/>
                <Sponsors/>
            </div>
        </div>
    );
}