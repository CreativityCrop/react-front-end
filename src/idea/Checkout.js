import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
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
    let location = useLocation();

    useEffect(() => {
        if (props.clientSecret === undefined || props.clientSecret === null) {
            const url = location.pathname;
            const idea_id = url.match(/[0-9a-fA-F]{64}/g)[0];
            console.log(getToken());
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
    }, [location, props.clientSecret, setAuthContext]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            <AuthProvider />
            <div id="buy-request" className="">
                {
                    clientSecret && <Elements options={options} stripe={stripePromise}><CheckoutForm /></Elements>
                }
            </div>
        </div>
    );
}