import { useState, useEffect } from 'react';
import AuthProvider, { MAIN_API_URL, getToken } from '../AuthAPI';
import axios from 'axios';
import { toast } from 'react-toastify';

import AccountSettings from './AccountSettings';
import Library from './Library';
import Checkout from '../idea/Checkout';
import Idea from '../idea/Idea';

export default function Dashboard() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [finishPayment, setFinishPayment] = useState(false);

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        if(userData.unfinished_intent !== undefined && userData.unfinished_intent !== null) {
            toast("You have unfinished payment for idea!", { draggable: true });
        }
    }, [userData]);

    const loadUserData = async () => {
        const response = await axios.get(MAIN_API_URL + "/account", {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        setUserData(response.data);
        setLoading(false);
    }

    return(
        <div className="mt-14 select-none">
            <AuthProvider/>
            { !finishPayment ?
                <div>
                    {
                        userData.unfinished_intent !== undefined && userData.unfinished_intent !== null ?
                        <div> 
                            <p>You have unfinished payment for idea: {userData.title}!</p>
                            <button onClick={() => setFinishPayment(true) }>Retry payment</button>
                        </div>
                        : null
                    }
                    {!loading && <AccountSettings
                        userData={userData}
                        avatarUrl={userData.avatar_url}
                    /> }
                    <Library/>
                </div>
                : <UnpaidOrder userData={userData}/>
            }
        </div>
    );
}

function UnpaidOrder(props) {
    const userData = props.userData;
    return (
        <div>
            <Idea
                key={userData.unfinished_payment_idea}
                id={userData.unfinished_payment_idea}
                imgUrl={userData.idea_img}
                title={userData.title}
                shortDesc={userData.short_desc}
                price={userData.price}
            />
            <Checkout clientSecret={userData.unfinished_intent_secret}/>
        </div>
    )
}