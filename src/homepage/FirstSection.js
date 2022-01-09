export default function FirstSection(){
    return(
        <div className="pt-28 w-full select-none">
            <div id="holder" className="flex flex-row">
                <div className="grid gird-cols-6 text-center p-8 mr-20 ml-5 mt-8 h-56">
                    <h1 className="text-5xl tetx-extrabold mb-2">A marketplace for</h1>
                    <div className="max-w-30 content-center">
                        <h2 className="text-5xl text-extrabold mb-3 py-2 hover:text-red-600">ideas</h2>
                    </div>
                    <h3 className="text-xl">insparational quote here</h3>
                </div>
                <div className="bg-slate-300 grid gird-cols-6 w-96 h-72">
                    <p>img</p>
                </div>
            </div>
            {/* <div className="bg-pink-300 w-10 h-10">
            </div> */}
        </div>
    );
}