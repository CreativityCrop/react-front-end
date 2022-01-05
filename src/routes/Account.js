import AuthProvider from '../AuthProvider';

export default function Account() {
  return (
    <div>
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