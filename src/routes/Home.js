import AuthProvider from '../AuthAPI';

import FirstSection from "../homepage/FirstSection";
import SecondSection from '../homepage/SecondSection';
import ThirdSection from '../homepage/ThirdSection';
import FourthSection from '../homepage/FourthSection';

export default function Home() {
    return (
        <div id="home">
            <AuthProvider/>
            <FirstSection/>
            <SecondSection/>
            <ThirdSection/>
            <FourthSection/>
        </div>
    );
}