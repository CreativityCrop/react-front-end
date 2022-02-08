import { LinkMenu } from './LinkMenu.js';
import Logo from './Logo.js';

export default function Header() {
    return (
        <div id="header" className="flex py-2 px-10 border-b-2 justify-between place-items-center select-none
        sm:p-[0.35rem] sm:py-3">
            <LinkMenu/>
        </div>
    );
}