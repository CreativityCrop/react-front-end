import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function MainContent() {
    return (
        <div className="flex flex-col min-h-screen font-heading">
            <Header/>
            <div className="flex-grow container">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}