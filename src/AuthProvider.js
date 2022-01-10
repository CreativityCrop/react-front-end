import { useContext, useEffect } from 'react';

import { getToken, verifyToken } from './AuthAPI';
import { AuthContext } from './AuthAPI';

export default function AuthProvider() {
    const [ authContext , setAuthContext ] = useContext(AuthContext);
    useEffect(() => {
        verifyToken().then( () => {
            if(getToken() != null ) {
                setAuthContext("authenticated");
            }
            else {
                setAuthContext("unathenticated");
            }
        });
        //console.log("Token: " + getToken() + "\nStatus: " + authContext);
    }, [authContext, setAuthContext]);
    return(<></>);
} 