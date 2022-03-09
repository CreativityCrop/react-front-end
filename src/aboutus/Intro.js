export default function Intro() {
    return(
        <div id="first-section" className="flex flex-row sm:flex-col gap-6 justify-center items-center p-4">
            <div className="w-96 h-64 sm:order-2 sm:w-[21rem] overflow-hidden">
                <img alt="" src="./assets/Illustrations/4.png" className="scale-150 object-cover"/>
            </div>
            <div className="text-center w-96 sm:w-80 ">
                <h1 className="text-4xl mb-2">About us</h1>
                <h3 className="text-lg">Get to know our team, sponsors, way of work and how our idea came to life!</h3>
            </div>
        </div>
    );
}