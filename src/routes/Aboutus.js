import AuthProvider from '../AuthAPI';
import Intro from '../aboutus/Intro';
import Teams from '../aboutus/Team';
import Tools from '../aboutus/Tools';
import History from '../aboutus/History';
import Contact from '../aboutus/Contact';

export default function Aboutus() {
    return (
        <div id="aboutus" className="flex flex-col gap-8 mt-28 mb-20 select-none">
            <AuthProvider/>
            <Intro/>
            <Teams/>
            <Contact/>
            <Tools/>
            <History/>
        </div>
    );
}