import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { getToken, AuthContext } from './AuthAPI';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from "react-scroll-to-top";
import CookieConsent from "react-cookie-consent";

import 'react-toastify/dist/ReactToastify.css';

import Home from './routes/Home';
import Marketplace from './routes/Marketplace';
import Aboutus from './routes/Aboutus';
import Login from './routes/Login';
import Register from './routes/Register';
import PasswordReset from './routes/PasswordReset';
import Account from './routes/Account';
import Logout from './routes/Logout';
import ViewIdea from './routes/ViewIdea';
import TermsAndConditions from './routes/TermsAndConditions';
import PrivacyPolicy from './routes/PrivacyPolicy';
import Admin from './routes/Admin';

import NotFound from './NotFound';
import MainContent from './MainContent';

import SellView from './marketplace/SellView';
import BuyView from './marketplace/BuyView';
import IdeasForSale from './marketplace/buyview/IdeasForSale';
import BuyIdea from './marketplace/buyview/BuyIdea';
import Checkout from './idea/Checkout';
import Invoice from './account/Invoice';


export default function App() {
    const [authContext, setAuthContext] = useState("unauthenticated");
    let location = useLocation();

    useEffect(() => {
        let title;
        switch(location.pathname) {
            case "/": title = ""; break;
            case "/marketplace": title = "Marketplace"; break;
            case "/marketplace/buy": title = "Buy"; break;
            case "/marketplace/sell": title = "Sell"; break;
            case "/about-us": title = "About us"; break;
            case "/account": title = "Account"; break;
            case "/login": title = "Login"; break;
            case "/register": title = "Register"; break;
            case "/password-reset": title = "Password reset"; break;
            case "/terms-conditions": title = " Terms and Conditions"; break;
            case "/privacy-policy": title = "Privacy Policy"; break;
            case "/idea": title = "Idea"; break;
            default: title = ""; break;
        }
        document.title = title + (title.length === 0 ? "" : " - ") + "CreativityCrop";
    }, [location]);

    return (
        <div>
            <ToastContainer
                position="top-center"
                closeOnClick
                pauseOnHover
                autoClose={5000}
            />
            <ScrollToTop 
                style={{borderRadius: "9999px"}}
                component={
                    <div className="w-full h-full text-white text-center text-3xl rounded-full opacity-80 bg-maxbluepurple">↑</div>
                }
                smooth
            />
            <ScrollToTopOnURL/>
            <CookieConsent
                location="bottom"
                buttonText="I consenst!"
                cookieName="cookie-consent"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px", marginRight: '3rem' }}
                expires={150}
            >
                This website uses cookies. By using it, you agree to the Terms of Service and Privacy Policy.{" "}
                <span className="text-xs"><Link to="/privacy-policy">Privacy Policy</Link></span>
            </CookieConsent>
            <AuthContext.Provider value={[authContext, setAuthContext]}>
                <Routes>
                    {/* Main route */}
                    <Route path="/" element={ <MainContent/> }>
                        {/* Index route */}
                        <Route index element={ <Home/> }/>
                        {/* Marketplace routes */}
                        <Route path="marketplace" element={ <Marketplace/> }>
                            <Route index element={ <Navigate to="./buy"/> }/>
                            <Route path="buy" element={ <BuyView/> }>
                                <Route index element={ <IdeasForSale/> } />
                                <Route path=":ideaID" element={
                                    <AuthenticatedRoute>
                                        <BuyIdea/>
                                    </AuthenticatedRoute>
                                }>
                                    <Route path="checkout" element={ <Checkout/> } />
                                </Route>
                            </Route>
                        <Route path="sell" element={
                            <AuthenticatedRoute>
                                <SellView/>
                            </AuthenticatedRoute>
                        }/>
                        </Route>
                        {/* All other first level routes */}
                        <Route path="about-us" element={ <Aboutus/> }/>

                        <Route path="login" element={
                            <AuthenticationRoute>
                                <Login/>
                            </AuthenticationRoute>
                        }/>
                        <Route path="register" element={
                            <AuthenticationRoute>
                                <Register/>
                            </AuthenticationRoute>
                        }/>
                        <Route path="password-reset" element={
                            <AuthenticationRoute>
                                <PasswordReset/>
                            </AuthenticationRoute>
                        }/>

                        <Route path="logout" element={ <Logout/> }/>
                
                        <Route path="account" element={
                            <AuthenticatedRoute>
                                <Account/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/idea/:ideaID" element={
                            <AuthenticatedRoute>
                                <ViewIdea/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/invoice/:invoiceID" element={
                            <AuthenticatedRoute>
                                <Invoice/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/admin" element={
                            <AuthenticatedRoute>
                                <Admin/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/terms-conditions" element={ <TermsAndConditions/> } />
                        <Route path="/privacy-policy" element={ <PrivacyPolicy/> } />

                        {/* Route to display some error page when the route is not defined */}
                        <Route path="*" element={ <NotFound/> } />
                    </Route>
                </Routes>
            </AuthContext.Provider>
        </div>
  );
}

export function AuthenticationRoute({children}) {
    let auth = getToken();
    let location = useLocation();

    if(auth) {
        return <Navigate to="/account" state={{ from: location }}/>;
    }

    return children;
}

export function AuthenticatedRoute({children }) {
    let auth = getToken();
    let location = useLocation();

    if(!auth) {
        localStorage.setItem("redirect-back", location.pathname);
        return <Navigate to="/login" state={{ from: location }}/>;
    }

    return children;
}

function ScrollToTopOnURL() {
  const pathname  = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}