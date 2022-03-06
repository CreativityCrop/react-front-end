import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

import AuthProvider, { MAIN_API_URL, getToken, removeToken, AuthContext } from '../AuthAPI';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Jx4d2Ldhfi7be410LUMAYrElAWn9sf4uB1ulyZrYU8F0qgSUFC9bS4TQ8LNTwDx9N1MOI4rc82OHZR07ZrJQMp600LkklOSo9");

export default function Checkout(props) {
    const [, setAuthContext] = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.clientSecret === undefined || props.clientSecret === null) {
            const url = location.pathname;
            const idea_id = url.match(/[0-9a-fA-F]{64}/g)[0];
            // Create PaymentIntent as soon as the page loads
            axios
                .get(MAIN_API_URL + "/payment/create?idea_id=" + idea_id, {
                    headers: {
                        "Token": getToken(),
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                .then((response) => {
                    setClientSecret(response.data.clientSecret);
                })
                .catch((error) => {
                    if(error.response.status === 401) {
                        removeToken();
                        setAuthContext("unauthenticated");
                        navigate("/login");
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
        }
        else {
            setClientSecret(props.clientSecret);
        }
    }, [location, props.clientSecret, setAuthContext, navigate]);

    const cancelPayment = () => {
        const url = location.pathname;
        let idea_id;
        console.log(url);
        if(url.match(/[0-9a-fA-F]{64}/g) === null) {
            console.log("No id in url");
            idea_id = props.ideaID;
        }
        else {
            console.log("ID IS IN URL");
            idea_id = url.match(/[0-9a-fA-F]{64}/g)[0]
        }
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
                if(location.pathname !== '/account') {
                    navigate("/marketplace/buy");
                }
                else {
                    window.location.reload();
                }
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    removeToken();
                    setAuthContext("unauthenticated");
                    navigate("/login");
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

    const appearance = {
        theme: 'stripe',
        variables: {
            borderRadius: '0px',
        }
    };
    const options = {
        clientSecret,
        appearance,
        locale: "en"
    };

    return (
        <div className="mt-6">
            <AuthProvider />
            <div id="buy-request" className={props.className}>
                {
                    clientSecret && <Elements options={options} stripe={stripePromise}><CheckoutForm /></Elements>
                }
            </div>
            <button type="button" className="w-full mt-4 py-3 px-4 font-arial font-bold text-slate-300 bg-yankeesblue hover:bg-purple-700 
             hover:origin-bottom hover:drop-shadow-xl transition duration-150"
                    onClick={() => cancelPayment()}
            >Cancel order </button>
        </div>
    );
}