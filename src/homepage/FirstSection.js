export default function FirstSection(){
    return(
        <div className="pt-40 select-none">
                <div id="holder" className="flex flex-row">
                    <div className="bg-violet-600 grid gird-cols-6 text-center p-10 mr-20">
                        <h1 className="text-4xl tetx-extrabold mb-2">A marketplace for</h1>
                        <div className="max-w-30 content-center">
                            <h2 className="text-4xl text-extrabold mb-6 py-2 hover:bg-slate-300">ideas</h2>
                        </div>
                        <h3 className="text-xl">insparational quote here</h3>
                    </div>
                    <div className="bg-violet-600 grid gird-cols-6 p-10 ml-20">
                        <p>this is a cool picture, imagine it</p>
                    </div>
                </div>
        </div>
    );
}