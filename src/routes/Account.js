import { verifyToken } from '../AuthAPI';
import { useEffect } from 'react'

export default function Account() {

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div>
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