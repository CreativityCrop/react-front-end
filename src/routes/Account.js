import AuthProvider from '../AuthAPI';
import Dashboard from '../account/Dashboard';

export default function Account() {
  return (
    <div id="account" className="ml-36 md:ml-3 sm:ml-0">
        <AuthProvider/>
        <Dashboard/>
    </div>
  );
}