import { useNavigate } from 'react-router-dom';
import test from '../assets/test.png';

export default function FourthSection() {
    const navigate = useNavigate();

    return(
        <div className="w-screen bg-maxbluepurple xl:-ml-64">
            <div className="py-8 select-non">
                <div className="flex flex-row flex-wrap place-content-center px-0">
                    <div className="text-center flex-initial w-64 order-2 sm:order-1 sm:mx-6">
                        <h1 className="mb-2 mt-8 text-3xl">About us</h1>
                        <h3 className="mb-8">very very short description about us and our idea</h3>
                        <button type="button" className="w-44 h-8 text-center bg-jasmine hover:bg-purple-400
                        hover:scale-105 hover:origin-bottom hover:rotate-3 hover:drop-shadow-xl transition duration-150"
                            onClick={() => navigate("/about-us")}>
                            Learn more about us!
                        </button>
                    </div>
                    <div className="order-1 sm:order-2 ml-auto mr-10 xl:mr-14 bg-slate-300 w-44 h-64 sm:mt-10 sm:w-40 sm:h-56">
                        <img alt="" src={test} />
                    </div>
                    <div className="order-3 mr-auto ml-10 xl:ml-14 bg-slate-300 w-44 h-64 sm:ml-6 sm:mt-10 sm:w-40 sm:h-56">
                        <img alt="" src={test} />
                    </div>
                </div>
            </div>
        </div>
    );
}