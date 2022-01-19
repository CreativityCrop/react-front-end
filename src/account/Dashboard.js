import { useState, useEffect } from 'react';
import { MAIN_API_URL, getToken } from '../AuthAPI';
import axios from 'axios';

import AccountSettings from './AccountSettings';
import Library from './Library';

export default function Dashboard() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const response = await axios.get(MAIN_API_URL + "/account", {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        setUserData(response.data);
    }

    return(
        <div className="mt-14 select-none">
            <AccountSettings
                avatarUrl={userData.avatar_url}
            />
            <Library/>
        </div>
    );
}