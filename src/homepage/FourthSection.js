import { useNavigate } from 'react-router-dom';
import test from '../assets/test.png';

export default function FourthSection() {
    const navigate = useNavigate();

    return(
        <div className="p-8 bg-maxbluepurple">
            <div className="flex flex-row flex-wrap gap-32 justify-center">
                <div className="text-center flex-initial w-64 order-2 sm:order-1">
                    <h1 className="mb-2 mt-8 text-3xl">About us</h1>
                    <h3 className="mb-8">very very short description about us and our idea</h3>
                    <button type="button" className="w-44 h-8 text-center bg-jasmine hover:bg-purple-400
                    hover:scale-105 hover:origin-bottom hover:rotate-3 hover:drop-shadow-xl transition duration-150"
                        onClick={() => navigate("/about-us")}>
                        Learn more about us!
                    </button>
                </div>
                <img alt="" src={test} className="order-1 sm:order-2  bg-slate-300 w-44 h-64 sm:mt-10 sm:w-40 sm:h-56"/>
                <img alt="" src={test} className="order-3 bg-slate-300 w-44 h-64 sm:mt-10 sm:w-40 sm:h-56"/>
            </div>
        </div>
    );
}