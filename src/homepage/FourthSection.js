import { useNavigate } from 'react-router-dom';


export default function FourthSection() {
    const navigate = useNavigate();

    return(
        <div className="p-6 sm:px-2 bg-maxbluepurple">
            <div className="flex flex-row flex-wrap gap-16 md:gap-2 sm:gap-6 justify-center">
                <div className="text-center flex-initial sm:grow sm:w-full w-60 order-2 sm:order-1">
                    <h1 className="mb-2 mt-8 text-3xl">About us</h1>
                    <h3 className="mb-8 px-4">Get to know our team, sponsors, way of work and how our idea came to life</h3>
                    <button type="button" className="p-2 px-4 text-center bg-jasmine hover:bg-amber-500
                    hover:scale-105 hover:origin-bottom hover:rotate-3 hover:drop-shadow-xl transition duration-150"
                        onClick={() => navigate("/about-us")}>
                        Learn more about us!
                    </button>
                </div>
                <img alt="" src="./assets/Illustrations/lilbuddy2.png" className="order-1 xl:w-64 sm:order-2 sm:mt-10 object-cover scale-75 -mt-6"/>
                <img alt="" src="./assets/Illustrations/lilbuddy4.png" className="order-3 xl:w-72 sm:mt-10 object-cover scale-75 -mt-6"/>
            </div>
        </div>
    );
}