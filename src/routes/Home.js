import AuthProvider from '../AuthProvider';

import FirstSection from "../homepage/FirstSection";
import SecondSection from '../homepage/SecondSection';

export default function Home() {
    return (
        <div id="home">
            <AuthProvider/>
            <FirstSection/>
            <SecondSection/>
        </div>
    );
}