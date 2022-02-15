import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MAIN_API_URL, getToken, removeToken, AuthContext } from '../AuthAPI';

import AccountSettings from './AccountSettings';
import Library from './Library';
import Checkout from '../idea/Checkout';
import Idea from '../idea/Idea';

export default function Dashboard() {
    const [, setAuthContext] = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [finishPayment, setFinishPayment] = useState(false);

    useEffect(() => {
        axios
            .get(MAIN_API_URL + "/account", {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (err.response) {
                    setError(err.response.data.detail);
                }
                else if (err.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }
            
            });
    }, [setAuthContext]);

    useEffect(() => {
        if(userData.unfinishedPaymentIntent !== undefined && userData.unfinishedPaymentIntent !== null) {
            toast("You have unfinished payment for idea!", { draggable: true });
        }
    }, [userData]);

    const cancelPayment = (idea_id) => {
        axios
            .delete(MAIN_API_URL + `/payment/cancel?idea_id=${idea_id}`, {
                headers: {
                    "Token": getToken(),
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {

            })
            .catch((error) => {
                if(error.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                }
                else if (error.response) {
                    toast.error(error.response.data.detail.msg);
                }
                else if (error.request) {
                    // client never received a response, or request never left
                }
                else {
                    // anything else
                }
            
            });
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
                    {
                        !loading && 
                            <AccountSettings
                                userData={userData}
                                avatarUrl={userData.avatarURL}
                            /> 
                    }
                    {
                        error && <div>
                            <h1>{error.title}</h1>
                            <p>{error.msg}</p>
                        </div>
                    }
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