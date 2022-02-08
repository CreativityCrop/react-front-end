import { ReactComponent as LogoSVG } from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';

export default function Logo() {
    const navigate = useNavigate();
    return(
        <div className = "lg:w-20 hover:cursor-pointer sm:w-10">
            <LogoSVG className="lg:w-[19rem] sm:w-40" onClick={ () => navigate("/") }/>
        </div>
    );
}