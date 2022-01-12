import AuthProvider from '../AuthAPI';
import FirstSec from '../aboutus/FirstSec';
import SecSec from '../aboutus/SecSec';
import ThirdSec from '../aboutus/ThirdSec';
import FourthSec from '../aboutus/FourthSec';

export default function Aboutus() {
    return (
        <div id="aboutus" className="">
            <AuthProvider/>
            <FirstSec/>
            <SecSec/>
            <ThirdSec/>
            <FourthSec/>
        </div>
    );
}