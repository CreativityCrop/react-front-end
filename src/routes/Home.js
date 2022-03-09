import AuthProvider from '../AuthAPI';

import Intro from "../homepage/Intro";
import MarketplaceButtons from '../homepage/MarketplaceButtons';
import HottestIdeas from "../idea/HottestIdeas";
import LearnAboutUs from '../homepage/LearnAboutUs';

export default function Home() {
    return (
        <div id="home" className="flex flex-col gap-8 mt-28 mb-20 select-none">
            <AuthProvider/>
            <Intro/>
            <MarketplaceButtons/>
            <HottestIdeas homepage/>
            <LearnAboutUs/>
        </div>
    );
}