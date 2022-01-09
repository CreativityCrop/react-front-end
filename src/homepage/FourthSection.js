import Illustrations from "./Illustrations";

export default function FourthSection(){
    return(
        <div className="my-8 select-none bg-blue-400">
            <div className="flex flex-row py-6 place-content-center">
                <Illustrations/>
                <div className="text-center w-64 mx-20">
                    <h1 className="mb-2 mt-8 text-3xl">About us</h1>
                    <h3 className="mb-8">very very short description about us and our idea</h3>
                    <div className="ml-9 w-44 h-8 text-center bg-slate-400 hover:bg-purple-400">
                            <p>this is a button</p>
                    </div>
                </div>
                <Illustrations/>
            </div>
        </div>
    );
}