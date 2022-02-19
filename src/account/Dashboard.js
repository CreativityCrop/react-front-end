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
    const [finishPayment, setFinishPayment] = useState(null);

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
    }, [setAuthContext, finishPayment]);

    useEffect(() => {
        if(userData.unfinishedPaymentIntent !== undefined && userData.unfinishedPaymentIntent !== null) {
            toast.warning("You have unfinished payment for an idea!");
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
                toast.success("Idea payment is canceled!");
                setFinishPayment(false);
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

    if(finishPayment) {
        return(
        <UnpaidOrder userData={userData}/>
        );
    }

    return(
        <div className="flex flex-col gap-8 select-none">
            {
                userData.unfinishedPaymentIntent &&
                <div className=""> 
                    <p className="mb-3 sm:mb-4">You have unfinished payment for idea: {userData.unfinishedPaymentIdeaTitle}!</p>
                    <div className=""> 
                        <button type="button" onClick={() => setFinishPayment(true) } 
                        className="bg-green-200 hover:bg-purple-200 p-1 mb-5 px-2 mr-4
                        hover:rotate-3 hover:drop-shadow-xl transition duration-150">Retry payment</button>
                        <button type="button" onClick={() => cancelPayment(userData.unfinishedPaymentIdeaID)} 
                        className="bg-red-200 hover:bg-purple-200 p-1 mb-5 px-2
                        hover:-rotate-3 hover:drop-shadow-xl transition duration-150">Cancel payment</button>
                    </div>
                </div>
            }
            {
                !loading && <AccountSettings
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
    );
}

function UnpaidOrder(props) {
    const userData = props.userData;
    return (
        <div className="m-auto select-none">
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