import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthAPI';


export function LinkMenu() {
	const [authContext, ] = useContext(AuthContext);
	
	return (
		<ul className="flex">
			<Link addr="/marketplace" text="Marketplace"/>
			<Link addr="/about-us" text="About us"/>
			{
				authContext === "authenticated" ?
				<>
					<Link addr="/account" text="Account"/>
      				<Link addr="/logout" text="Sign out"></Link>
				</> :
				<>
					<Link addr="/login" text="Login"/>
					<Link addr="/register" text="Register"/>
				</>
			}
		</ul>
	);
}

export default function Link(props) {
    return ( 
        <li className = "mr-6" >
            <NavLink 
                className={ ({isActive}) => isActive ? "text-red-700" : ""} 
                to={props.addr}
            >
                {props.text}
            </NavLink>
        </li>
    );
}

