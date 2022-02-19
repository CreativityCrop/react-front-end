import AuthProvider from '../AuthAPI';
import Dashboard from '../account/Dashboard';

export default function Account() {
  return (
    <div id="account" className="mt-28 mb-20">
        <AuthProvider/>
        <Dashboard/>
    </div>
  );
}