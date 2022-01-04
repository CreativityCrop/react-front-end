import Link from './Link.js';

export default function Logo() {
    return(
        <div className = "w-20">
            <img src="/logo.png" className="float-left mr-2" alt=""/>
            <ul className="flex">
            <Link
                text="Home"
                addr="#"
            /></ul>
        </div>
        );    
}