import { Outlet } from 'react-router-dom';
import AuthProvider from '../AuthAPI';

export default function BuyView() {

    return (
        <div id="buy-view" className="sm:max-w-[100vw] md:max-w-[100vw] flex flex-row md:flex-col sm:flex-col select-none w-fit">
            <AuthProvider/>
            <div className="bg-maxbluepurple xl:min-w-[47rem] min-h-[30rem] p-3">
                <Outlet/>
            </div>
        </div>
    );
}