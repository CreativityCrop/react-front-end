import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthAPI';


export default function LinkMenu(props) {
	const [authContext, ] = useContext(AuthContext);
    let variable;
    if(props.opened) {
        variable = "sm:flex";
    }
    else {
        variable = "sm:hidden";
    }
	return(
		<div className={"flex xl:flex-row sm:flex-col xl:space-x-4 md:space-x-3 sm:space-y-4 text-center sm:my-3 " + variable}>
			<div className="h-12 border-4 py-1 px-5 text-lg">
				<Link addr="/marketplace" text="Marketplace"/>
			</div>
			<div className="h-12 border-4 py-1 px-5 text-lg">
				<Link addr="/about-us" text="About us"/>
			</div>
			{ authContext === "authenticated" ? <AuthenticatedLinks/>: <UnauthenticatedLinks/> }
		</div>
	);
}

function AuthenticatedLinks() {
    return(
        <>
            <div className="h-10 border-4 py-1 px-5 mt-1">
                <Link addr="/account" text="Account"/>
            </div>
            <div className="h-10 border-4 py-1 px-5 mt-1">
                <Link addr="/logout" text="Sign out"></Link>
            </div>
        </>
    );
}

function UnauthenticatedLinks() {
    return(
        <>
            <div className="h-10 border-4 py-1 px-5 mt-1">
                <Link addr="/login" text="Login"/>
            </div>
            <div className="h-10 border-4 py-1 px-5 mt-1">
                <Link addr="/register" text="Register"/>
            </div>
        </>
    );
}

function Link(props) {
    return ( 
        <NavLink  
            className={ ({isActive}) => isActive ? "text-red-700" : ""}
            to={props.addr}
        >
            {props.text}
        </NavLink>
    );
}

