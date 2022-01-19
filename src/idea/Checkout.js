import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AuthProvider, { getToken, MAIN_API_URL } from '../AuthAPI';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import './ProcessBuyRequest.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Jx4d2Ldhfi7be410LUMAYrElAWn9sf4uB1ulyZrYU8F0qgSUFC9bS4TQ8LNTwDx9N1MOI4rc82OHZR07ZrJQMp600LkklOSo9");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  let location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    const idea_id = url.substring(url.indexOf("buy/") + 4, url.indexOf("/checkout"));
    // Create PaymentIntent as soon as the page loads
    axios.get(MAIN_API_URL + "/payment/create?idea_id=" + idea_id, {
        headers: {
            "Token": getToken(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((res) => setClientSecret(res.data.clientSecret));
  }, [location]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

    return(
        <div>
            <AuthProvider/>
            <div id="BuyRequest" className="">
              {console.log(clientSecret)}
              { clientSecret !== undefined ?
                  (clientSecret && (<Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                  </Elements>)) : ""
              }
            </div>
        </div>
    );
}