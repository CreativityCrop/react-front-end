import { useNavigate } from 'react-router-dom'

export default function Account() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ marginTop: 20, minHeight: 700 }}>
        <h1>Profile page</h1>
        <p>Hello there, welcome to your profile page</p>

        <button onClick={signOut}>sign out</button>
      </div>
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