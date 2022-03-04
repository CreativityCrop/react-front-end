import LinkMenu from './LinkMenu.js';
import 'animate.css';
import Logo from './Logo.js';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { ReactComponent as HamburgerSVG } from '../assets/hamburger-menu.svg'

export default function Header() {
    const [opened, setOpened] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpened((prevOpened) => { if(prevOpened) return false;} );
    }, [location.pathname]);

    return (
        <div id="header"
        className="flex flex-row flex-wrap py-2 xl:px-10 px-4 border-b-2 justify-between place-items-center select-none">
            <div className="sm:w-full flex flex-row justify-between place-items-center">
                <Logo className="w-44 md:w-40 ml-3 shrink-0"/>
                <button className="hidden sm:block shrink-0 mr-3 w-12 h-12" onClick={() => setOpened(prevOpened => !prevOpened)}><HamburgerSVG/></button>
            </div>
            <LinkMenu className="sm:m-auto" opened={opened}/>
        </div>
    );
}