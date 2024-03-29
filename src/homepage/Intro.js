

export default function Intro() {
    return(
        <div id="first-section" className="xl:mb-52 p-4">
            <div className=" flex flex-row sm:flex-col gap-4 justify-center">
                <div id="left" className="flex flex-col gap-2 justify-center text-center xl:basis-1/2 md:basis-1/2 m-auto">
                    <div className="">
                        <h1 className="text-4xl mb-1">A marketplace for</h1>
                        <h2 className="max-w-fit m-auto text-4xl px-6 py-3 hover:bg-maxbluepurple hover:text-slate-100 transition-colors delay-110 rounded-sm mb-4">ideas</h2>
                    </div>
                    <h3 className="">“You only live once, but if you do it right, once is enough.”</h3>
                    <h3 className="font-medium">― Mae West</h3>
                </div>
                <img src="./assets/illustrations/1.png" alt="" id="right" className="xl:basis-1/2 md:basis-1/2 m-auto w-64 h-72 md:h-64 sm:w-72 object-cover"/>
            </div>
            <div className="flex justify-center mt-28">
                <button
                className="block text-white md:hidden sm:hidden w-12 h-12 text-center text-2xl rounded-full opacity-80 bg-maxbluepurple delay-100 hover:scale-105 hover:opacity-100"
                onClick={
                    () => { document.getElementById("second-section").scrollIntoView({ behavior: "smooth" });}
                }>
                    ↓
                </button>
            </div>
        </div>
    );
}