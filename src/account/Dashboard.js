import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MAIN_API_URL, getToken, removeToken, AuthContext } from '../AuthAPI';

import AccountSettings from './AccountSettings';
import Library from './Library';
import Checkout from '../idea/Checkout';
import Idea from '../idea/Idea';

// Component that holds all account related components
export default function Dashboard() {
    const [, setAuthContext] = useContext(AuthContext);
    // the default avatarURL is an empty image blob, to prevent image not found while loading data
    const [userData, setUserData] = useState({avatarURL: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="});
    const [error, setError] = useState();
    // vars to hold non finished payment things
    const [retryPayment, setRetryPayment] = useState(null);
    const [unfinishedPaymentChanged, setUnfinishedPaymentChanged] = useState(false);

    // side effect to fetch account data, updates on first render and if unfinished payment has changed state
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
                    setError({title: "Network error!", msg: "Please check your connection."});
                }
                else {
                    setError({title: "Unknown error!", msg: "Please try again."});
                }
            
            });
    }, [setAuthContext, unfinishedPaymentChanged]);

    // side effect to spawn a toast notification for unfinished payment
    useEffect(() => {
        if(userData.unfinishedPaymentIntent) {
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
                setRetryPayment(false);
                setUnfinishedPaymentChanged(true);
            })
            .catch((error) => {
                if(error.response?.status === 401) {
                    removeToken("expired");
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

    //if payment is retried render only the component for finishing it
    if(retryPayment) {
        return(
        <UnpaidOrder userData={userData}/>
        );
    }

    return(
        <div className="flex flex-col gap-8 select-none">
            {
                // display div only if there is unfinished payment
                userData.unfinishedPaymentIntent &&
                <div id="finish-payment" className="w-fit bg-maxbluepurple p-6 m-auto   "> 
                    <p className="mb-6 sm:mb-4"><strong>You have unfinished payment for idea:</strong> {userData.unfinishedPaymentIdea.title}</p>
                    <div className="flex flex-row justify-between"> 
                        <button type="button" onClick={() => setRetryPayment(true) } 
                        className="bg-jasmine hover:bg-amber-500 p-1 px-2
                            hover:rotate-3 hover:drop-shadow-xl transition duration-150">Retry payment</button>
                        <button type="button" onClick={() => cancelPayment(userData.unfinishedPaymentIdea.id)} 
                        className="bg-yankeesblue hover:bg-purple-700 text-slate-200 p-1 px-2
                            hover:-rotate-3 hover:drop-shadow-xl transition duration-150">Cancel payment</button>
                    </div>
                </div>
            }
            <AccountSettings
                userData={userData}
                avatarUrl={userData.avatarURL}
            />
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
        <div id="ideas-list" className="w-fit m-auto mt-12 mb-20 p-8 md:p-4 sm:p-3 bg-maxbluepurple select-none">
            <Idea
                key={userData.unfinishedPaymentIdea.id}
                id={userData.unfinishedPaymentIdea.id}
                imgUrl={userData.unfinishedPaymentIdea.imageURL}
                title={userData.unfinishedPaymentIdea.title}
                shortDesc={userData.unfinishedPaymentIdea.shortDesc}
                price={userData.unfinishedPaymentIdea.price}
                likes={userData.unfinishedPaymentIdea.likes}
            />
            <Checkout className="" ideaID={userData.unfinishedPaymentIdea.id} clientSecret={userData.unfinishedPaymentIntentSecret}/>
        </div>
    )
}