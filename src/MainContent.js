import { Outlet } from 'react-router-dom';

export default function MainContent() {
    return (
        <div className="flex flex-col items-center">
            <Outlet/>
        </div>
    );
}