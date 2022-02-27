import { Outlet } from 'react-router-dom';
import AuthProvider from '../AuthAPI';

export default function BuyView() {

    return (
        <div id="buy-view" className="flex flex-row md:flex-col sm:flex-col select-none w-fit">
            <AuthProvider/>
            <div className="bg-maxbluepurple xl:min-w-[46rem] xl:min-h-[46rem] p-3">
                <Outlet/>
            </div>
        </div>
    );
}