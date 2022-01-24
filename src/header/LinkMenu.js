import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthAPI';


export function LinkMenu() {
	const [authContext, ] = useContext(AuthContext);
	
	return (
		<ul className="flex space-x-4">
			<div className="border-4 h-12 py-1 pl-5 text-lg">
				<Link addr="/marketplace" text="Marketplace"/>
			</div>
			<div className="border-4 h-12 py-1 pl-5 text-lg">
				<Link addr="/about-us" text="About us"/>
			</div>
			{
				authContext === "authenticated" ?
				<>
					<div className="border-4 h-10 py-1 pl-5 mt-1">
						<Link addr="/account" text="Account"/>
					</div>
					<div className="border-4 h-10 py-1 pl-5 mt-1">
      					<Link addr="/logout" text="Sign out"></Link>
					</div>
				</> :
				<>
					<div className="border-4 h-10 py-1 pl-5 mt-1">
						<Link addr="/login" text="Login"/>
					</div>
					<div className="border-4 h-10 py-1 pl-5 mt-1">
						<Link addr="/register" text="Register"/>
					</div>
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

