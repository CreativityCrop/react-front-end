import AuthProvider from '../AuthProvider';
import FirstSec from '../about us/FirstSec';
import SecSec from '../about us/SecSec';
import ThirdSec from '../about us/ThirdSec';

export default function Aboutus() {
    return (
        <div id="aboutus" className="">
            <AuthProvider/>
            <FirstSec/>
            <SecSec/>
            <ThirdSec/>
        </div>
    );
}