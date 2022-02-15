export default function FirstSection() {
    return(
        <div>
            <div id="first-section" className="mt-28 sm:mt-16 md:w-11/12 select-none
            flex flex-row sm:flex-col md:space-x-3 xl:space-x-3 sm:space-y-8 justify-center
            ">
                <div id="left" className="text-center xl:basis-1/2 m-auto">
                    <h1 className="text-4xl mb-2">A marketplace for</h1>
                    <div className=" content-center">
                        <h2 className="text-4xl mb-3 py-2 hover:text-red-600">ideas</h2>
                    </div>
                    <h3 className="text-lg">insparational quote here</h3>
                </div>
                <div id="right" className="xl:basis-1/2 m-auto bg-slate-300 w-64 h-72 md:h-64 sm:w-72">
                    <p>img</p>
                </div>
            </div>
            <div className="w-12 h-12 text-center rounded-full m-auto mt-28 pt-2 opacity-80 bg-purple-400
            select-none transition delay-100 hover:scale-105 hover:opacity-100">
                <a href="#second-section" className="text-2xl scroll-smooth transition duration-100">↓</a>
            </div>
        </div>
    );
}