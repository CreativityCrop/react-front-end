import { NavLink } from 'react-router-dom';

export default function Link(props) {
    return ( 
        <li className = "mr-6" >
            <NavLink 
                className={({ isActive }) => isActive ? "text-red-700" : ""} 
                to={props.addr}
            >
                {props.text}
            </NavLink>
        
        </li>
    );
}