import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import AnimatedPage from './AnimatedPage';

export default function MainContent() {
    return (
        <AnimatedPage>
            <div className="flex flex-col min-h-screen font-whiterabbit" >
                <Header/>
                <div className="flex-grow container">
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </AnimatedPage>
    );
}