import { useNavigate } from 'react-router-dom';
import test from '../assets/test.png';

export default function FourthSection() {
    const navigate = useNavigate();

    return(
        <div className="p-6 sm:px-2 bg-maxbluepurple">
            <div className="flex flex-row flex-wrap gap-16 md:gap-8 sm:gap-6 justify-center">
                <div className="text-center flex-initial sm:grow sm:w-full w-60 order-2 sm:order-1">
                    <h1 className="mb-2 mt-8 text-3xl">About us</h1>
                    <h3 className="mb-8">Get to know our team, sponsors, way of work and how our idea came to life</h3>
                    <button type="button" className="w-44 h-8 text-center bg-jasmine hover:bg-amber-500
                    hover:scale-105 hover:origin-bottom hover:rotate-3 hover:drop-shadow-xl transition duration-150"
                        onClick={() => navigate("/about-us")}>
                        Learn more about us!
                    </button>
                </div>
                <img alt="" src={test} className="grow order-1 sm:order-2  bg-slate-300 w-44 h-64 sm:mt-10 sm:w-40 sm:h-56"/>
                <img alt="" src={test} className="grow order-3 bg-slate-300 w-44 h-64 sm:mt-10 sm:w-40 sm:h-56"/>
            </div>
        </div>
    );
}