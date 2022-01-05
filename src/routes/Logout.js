import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { removeToken } from '../AuthAPI';
import { AuthContext } from '../Context';

export default function Logout() {
    const [authContext, setAuthContext] = useContext(AuthContext);

    removeToken();
    setAuthContext("unauthenticated");

    return(
        <Navigate to="/"/>
    );
}