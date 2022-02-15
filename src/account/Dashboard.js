import { useState, useEffect } from 'react';
import { MAIN_API_URL, getToken } from '../AuthAPI';
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
        if(userData.unfinishedPaymentIntent !== undefined && userData.unfinishedPaymentIntent !== null) {
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
    };

    const cancelPayment = async (idea_id) => {
        const response = await axios.delete(MAIN_API_URL + `/payment/cancel?idea_id=${idea_id}`, {
            headers: {
                "Token": getToken(),
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        loadUserData();
    };

    return(
        <div className="mt-14 select-none">
            { !finishPayment ?
                <div>
                    {
                        userData.unfinishedPaymentIntent !== undefined && userData.unfinishedPaymentIntent !== null ?
                        <div> 
                            <p>You have unfinished payment for idea: {userData.unfinishedPaymentIdeaTitle}!</p>
                            <button type="button" onClick={() => setFinishPayment(true) }>Retry payment</button>
                            <button type="button" onClick={() => cancelPayment(userData.unfinishedPaymentIdeaID)}>Cancel payment</button>
                        </div>
                        : null
                    }
                    {!loading && <AccountSettings
                        userData={userData}
                        avatarUrl={userData.avatarURL}
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
        <div className="m-auto">
            <Idea
                key={userData.unfinishedPaymentIdeaID}
                id={userData.unfinishedPaymentIdeaID}
                imgUrl={userData.unfinishedPaymentIdeaPictureURL}
                title={userData.unfinishedPaymentIdeaTitle}
                shortDesc={userData.unfinishedPaymentIdeaShortDesc}
                price={userData.unfinishedPaymentIdeaPrice}
            />
            <Checkout clientSecret={userData.unfinishedPaymentIntentSecret}/>
        </div>
    )
}