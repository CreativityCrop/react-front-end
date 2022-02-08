export default function FirstSection() {
    return(
        <div className="xl:mt-28 mt-10 select-none">
            <div id="holder" className="flex xl:flex-row sm:flex-col sm:space-y-8 justify-center">
                <div className="text-center xl:basis-1/2 mt-8">
                    <h1 className="text-4xl mb-2">A marketplace for</h1>
                    <div className="max-w-30 content-center">
                        <h2 className="text-4xl mb-3 py-2 hover:text-red-600">ideas</h2>
                    </div>
                    <h3 className="text-lg">insparational quote here</h3>
                </div>
                <div className="xl:basis-1/2 self-center bg-slate-300 w-96 h-72">
                    <p>img</p>
                </div>
            </div>
            {/* <div className="bg-pink-300 w-10 h-10">
            </div> */}
        </div>
    );
}