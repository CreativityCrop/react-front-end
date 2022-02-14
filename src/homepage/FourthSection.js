import { useNavigate } from 'react-router-dom';
import test from '../assets/test.png';

export default function FourthSection() {
    const navigate = useNavigate();

    return(
        <div className="my-8 select-none bg-blue-400">
            <div className="flex flex-row flex-wrap place-content-center py-6 px-0">
                <div className="text-center flex-initial w-64 order-2 sm:order-1">
                    <h1 className="mb-2 mt-8 text-3xl">About us</h1>
                    <h3 className="mb-8">very very short description about us and our idea</h3>
                    <div className="ml-9 w-44 h-8 text-center bg-slate-400 hover:bg-purple-400"
                        onClick={() => navigate("/aboutus")}>
                        Learn more about us!
                    </div>
                </div>
                <div className="order-1 sm:order-2 m-auto bg-slate-300 w-44 h-64 sm:mt-10 sm:w-40 sm:h-56">
                    <img alt="" src={test} />
                </div>
                <div className="order-3 m-auto bg-slate-300 w-44 h-64 sm:ml-6 sm:mt-10 sm:w-40 sm:h-56">
                    <img alt="" src={test} />
                </div>
            </div>
        </div>
    );
}