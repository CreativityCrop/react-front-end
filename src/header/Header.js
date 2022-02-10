import LinkMenu from './LinkMenu.js';
import Logo from './Logo.js';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { ReactComponent as HamburgerSVG } from '../assets/hamburger-menu.svg'

export default function Header() {
    const [opened, setOpened] = useState(false);
    const pathname  = useLocation();

    useEffect(() => {
      setOpened(false);
    }, [pathname]);

    return (
        <div id="header"
        className="flex flex-row flex-wrap py-2 px-10 sm:pl-0 border-b-2 justify-between place-items-center select-none">
            <Logo className="w-44 md:w-40 sm:m-auto"/>
            <button className="hidden sm:block w-12 h-12" onClick={() => setOpened(prevOpened => !prevOpened)}><HamburgerSVG/></button>
            <LinkMenu className="sm:m-auto" opened={opened}/>
        </div>
    );
}