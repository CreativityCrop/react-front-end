import { useNavigate } from 'react-router-dom';

export default function SubmitTutorial() {
    const navigate = useNavigate();
    return (
        <div className="order-2 h-fit w-52 xl:-mt-10 sm:hidden md:hidden pt-6 pb-[3.8rem] px-4 bg-gradient-to-b via-yankeesblue from-yankeesblue">
            <h1 className="text-center text-2xl text-slate-300">Dont know where to start?</h1>
            <button className="mt-3 p-2 bg-jasmine hover:scale-105 hover:shadow-lg transition hover:bg-amber-500 hover:rotate-3"
             onClick={() => navigate("/user-manual")}>
                Read the User Manual
            </button>
        </div>
    );
}