import { ReactComponent as LogoSVG } from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';

export default function Logo() {
    const navigate = useNavigate();
    return(
        <div className = "w-20 hover:cursor-pointer">
            <LogoSVG onClick={
                () => {
                    navigate("/")
                }
            }/>
        </div>
    );
}