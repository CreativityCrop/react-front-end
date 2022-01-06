import AuthProvider from '../AuthProvider';

export default function Account() {
  return (
    <div id="account" className="">
      <AuthProvider/>
      <h1>Dashboard</h1>
      <Preferences />
    </div>
  );
}

function Preferences() {
  return (
    <div>
      <h2>Preferences</h2>
    </div>
  );
}