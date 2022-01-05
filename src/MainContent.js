import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function MainContent() {
    return (
        <div >
            <Header/>
            <div className="flex flex-col items-center">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}