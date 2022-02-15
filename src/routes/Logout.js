import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { removeToken, AuthContext } from '../AuthAPI';

export default function Logout() {
    const [ , setAuthContext ] = useContext(AuthContext);

    useEffect( () => {
        removeToken();
        setAuthContext("unauthenticated");
        toast.success("Successful logout!", { autoClose: 2000 })
    }, [setAuthContext]);

    return(
        <Navigate to="/"/>
    );
}