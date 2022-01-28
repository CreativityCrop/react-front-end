import AuthProvider from '../AuthAPI';
import Dashboard from '../account/Dashboard';

export default function Account() {
  return (
    <div id="account" className="">
        <AuthProvider/>
        <Dashboard/>
    </div>
  );
}