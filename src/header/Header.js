import LinkMenu from './LinkMenu.js';
import Logo from './Logo.js';
import { useState } from 'react';
import { ReactComponent as HamburgerSVG } from '../assets/hamburger-menu.svg'

export default function Header() {
    const [opened, setOpened] = useState(false);
    return (
        <div id="header"
        className="flex flex-col xl:flex-row py-2 px-10 border-b-4 justify-between place-items-center select-none ">
            <Logo/>
            <button className="hidden sm:block w-10 h-10" onClick={() => setOpened(prevOpened => !prevOpened)}><HamburgerSVG/></button>
            <LinkMenu opened={opened}/>
        </div>
    );
}