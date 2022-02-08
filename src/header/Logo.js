import { ReactComponent as LogoSVG } from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';

export default function Logo() {
    const navigate = useNavigate();
    return(
        <LogoSVG className="w-72 hover:cursor-pointer" onClick={ () => navigate("/") }/>
    );
}