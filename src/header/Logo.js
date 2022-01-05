import { useNavigate } from 'react-router-dom';

export default function Logo() {
    const navigate = useNavigate();
    return(
        <div className = "w-20 hover:cursor-pointer">
            <img src="/logo.png" className="float-left mr-2" alt="" onClick={
                () => {
                    navigate("/")
                }
            }/>
        </div>
    );
}