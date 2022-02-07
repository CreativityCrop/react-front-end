import Illustrations from "../homepage/Illustrations";

export default function SecSec(){
    return(
        <div className="mt-28 mb-8 select-none bg-blue-400">
            <div className="flex flex-row py-6 place-content-center">
                <Illustrations alt="img" src=""/>
                <div className="text-center w-72 mx-16">
                    <h1 className="mb-4 mt-8 text-3xl">Our Team</h1>
                    <h3 className="mb-8">a little about each of us :)
                        like a little bio or our background and what we studied, etc.</h3>
                </div>
                <Illustrations alt="img" src=""/>
            </div>
        </div>
    );
}