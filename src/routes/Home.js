import AuthProvider from '../AuthProvider';

import FirstSection from "../homepage/FirstSection";

export default function Home() {
    return (
        <div>
            <AuthProvider/>
            <FirstSection/>
        </div>
    );
}