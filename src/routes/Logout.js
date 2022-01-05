import { Navigate } from 'react-router-dom';
import { removeToken } from '../AuthAPI';

export default function Logout() {
    removeToken();

    return(
        <Navigate to="/"/>
    );
}