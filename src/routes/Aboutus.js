import AuthProvider from '../AuthAPI';
import FirstSec from '../aboutus/FirstSec';
import SecSec from '../aboutus/SecSec';
import ThirdSec from '../aboutus/ThirdSec';
import FourthSec from '../aboutus/FourthSec';
import Contact from '../aboutus/Contact';

export default function Aboutus() {
    return (
        <div id="aboutus" className="flex flex-col gap-8 mt-28 mb-20 select-none">
            <AuthProvider/>
            <FirstSec/>
            <SecSec/>
            <Contact/>
            <ThirdSec/>
            <FourthSec/>
        </div>
    );
}