import Illustrations from "../homepage/Illustrations";

export default function SecSec(){
    return(
        <div className="mt-28 mb-8 select-none bg-yankeesblue text-slate-300">
            <div className="flex flex-row py-6 place-content-center sm:flex-col">
                <Illustrations alt="img" src="" className="sm:ml-[7.1rem]"/>
                <div className="text-center w-72 mx-16 my-8 md:mx-9 sm:order-2">
                    <h1 className="mb-4  text-3xl">Our Team</h1>
                    <h3 className="">a little about each of us :)
                        like a little bio or our background and what we studied, etc.</h3>
                </div>
                <Illustrations alt="img" src="" className="sm:hidden"/>
            </div>
        </div>
    );
}