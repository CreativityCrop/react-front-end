import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function MainContent() {
    return (
        <div className="h-screen flex flex-col">
            <Header/>
            <div className="flex-grow">
                <div id="main-content" className="flex flex-col items-center">
                    <Outlet/>
                </div>
            </div>
            <Footer style={{flexShrink: "0"}}/>
        </div>
    );
}