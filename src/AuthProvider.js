import { useContext, useEffect } from 'react';

import { getToken, verifyToken } from './AuthAPI';
import { AuthContext } from './Context';

export default function AuthProvider() {
    const [ authContext , setAuthContext ] = useContext(AuthContext);
    useEffect(() => {
        verifyToken();
        if(getToken() != null ) {
            setAuthContext("authenticated")
        }
        else {
            setAuthContext("unathenticated");
        }
        console.log(getToken() + " " + authContext);
    }, [authContext, setAuthContext]);
    return(<></>);
}