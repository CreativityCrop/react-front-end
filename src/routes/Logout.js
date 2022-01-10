import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { removeToken, AuthContext } from '../AuthAPI';

export default function Logout() {
    const [ , setAuthContext ] = useContext(AuthContext);

    useEffect( () => {
        removeToken();
        setAuthContext("unauthenticated");
    }, [setAuthContext]);

    return(
        <Navigate to="/"/>
    );
}