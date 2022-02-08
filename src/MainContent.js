import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function MainContent() {
    return (
        <div className="flex flex-col">
            <Header/>
            <div className="flex-grow">
                <div id="main-content" className="xl:flex xl:justify-center">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}