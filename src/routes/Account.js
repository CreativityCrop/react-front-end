import AuthProvider from '../AuthProvider';
import Dashboard from '../account/Dashboard';

export default function Account() {
  return (
    <div id="account" className="">
      <AuthProvider/>
      <Dashboard/>
      <Preferences />
    </div>
  );
}

function Preferences() {
  return (
    <div>
      {/* <h2>Preferences</h2> */}
    </div>
  );
}