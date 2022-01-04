import { LinkMenu } from './LinkMenu.js';
import Logo from './Logo.js';

export function Header() {
    return (
        <div className="flex flex-auto bg-blue-500 cent p-10 justify-between z-10 top-0">
            <Logo/>
            <LinkMenu/>
        </div>
    );
}