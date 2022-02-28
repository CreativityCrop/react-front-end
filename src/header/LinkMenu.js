import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthAPI';


export default function LinkMenu(props) {
	const [authContext, ] = useContext(AuthContext);
    let variable;
    let navigate = useNavigate();
    if(props.opened) {
        variable = "sm:flex";
    }
    else {
        variable = "sm:hidden";
    }
	return(
		<div className={"flex flex-row sm:flex-col gap-3 text-center sm:my-3 " + variable + " " + props.className}>
			<div className="h-12 border-[3px] py-[6px] px-5 text-lg hover:scale-105 transition cursor-pointer flex justify-center items-center"
                onClick={() => navigate("/marketplace")}>
				<Link addr="/marketplace/" text="Marketplace"/>
			</div>
			<div className="h-12 border-[3px] py-[6px] px-5 text-lg hover:scale-105 transition cursor-pointer flex justify-center items-center"
                onClick={() => navigate("/about-us")}>
				<Link addr="/about-us" text="About us"/>
			</div>
			{ authContext === "authenticated" ? <AuthenticatedLinks/>: <UnauthenticatedLinks/> }
		</div>
	);
}

function AuthenticatedLinks() {
    let navigate = useNavigate();
    return(
        <>
            <div className="h-10 border-[3px] py-1 px-5 mt-1 hover:scale-105 transition cursor-pointer flex justify-center items-center"
                onClick={() => navigate("/account")}>
                <Link addr="/account" text="Account"/>
            </div>
            <div className="h-10 border-[3px] py-1 px-5 mt-1 hover:scale-105 transition cursor-pointer flex justify-center items-center"
                onClick={() => navigate("/logout")}>
                <Link addr="/logout" text="Sign out"></Link>
            </div>
        </>
    );
}

function UnauthenticatedLinks() {
    let navigate = useNavigate();
    return(
        <>
            <div className="h-10 border-[3px] py-1 px-5 mt-1 hover:scale-105 transition cursor-pointer flex justify-center items-center"
                onClick={() => navigate("/login")}>
                <Link addr="/login" text="Login"/>
            </div>
            <div className="h-10 border-[3px] py-1 px-5 mt-1 hover:scale-105 transition cursor-pointer flex justify-center items-center"
                onClick={() => navigate("/register")}>
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

