import { ReactComponent as LogoSVG } from '../assets/logo.svg'

import { useNavigate } from 'react-router-dom';

export default function Logo(props) {
    const navigate = useNavigate();
    return(
        <LogoSVG className={"hover:cursor-pointer " + props.className} onClick={ () => navigate("/") }/>
    );
}