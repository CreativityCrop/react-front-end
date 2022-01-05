import { LinkMenu } from './LinkMenu.js';
import Logo from './Logo.js';

export default function Header() {
    return (
        <div className="flex flex-auto bg-blue-500 cent py-2 px-10 justify-between place-items-center select-none">
            <Logo/>
            <LinkMenu/>
        </div>
    );
}