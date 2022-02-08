import LinkMenu from './LinkMenu.js';
import Logo from './Logo.js';
import { useState } from 'react';
import { ReactComponent as HamburgerSVG } from '../assets/hamburger-menu.svg'

export default function Header() {
    const [opened, setOpened] = useState(false);
    return (
        <div id="header"
        className="flex flex-row flex-wrap py-2 px-10 border-b-4 justify-between place-items-center select-none">
            <Logo className="w-44"/>
            <button className="hidden sm:block w-12 h-12" onClick={() => setOpened(prevOpened => !prevOpened)}><HamburgerSVG/></button>
            <LinkMenu className="sm:m-auto" opened={opened}/>
        </div>
    );
}