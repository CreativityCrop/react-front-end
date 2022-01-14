import AuthProvider from '../AuthAPI';

import AccountSettings from './AccountSettings';
import Library from './Library';

export default function Dashboard(){
    return(
        <div className="mt-14 select-none">
            <AuthProvider/>
            <AccountSettings/>
            <Library/>
        </div>
    );
}