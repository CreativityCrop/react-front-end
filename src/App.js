import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { getToken } from './AuthAPI';
import React, { useState, useEffect } from 'react'

import { AuthContext } from './Context';

import MainContent from './MainContent';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Aboutus from './routes/Aboutus';
import Account from './routes/Account';

import NotFound from './NotFound';

import Marketplace from './routes/Marketplace';
import MarketplaceIndex from './marketplace/MarketplaceIndex';
import BuyView from './marketplace/BuyView';
import SellView from './marketplace/SellView';
import IdeasForSale from './marketplace/buyview/IdeasForSale';
import Idea from './marketplace/Idea';
import ListedIdea from './marketplace/buyview/ListedIdea';
import Logout from './routes/Logout';


export default function App() {
  const [authContext, setAuthContext] = useState("unauthenticated");
  let location = useLocation();

  useEffect(() => {
    let title;
    switch(location.pathname) {
      case "/": title = ""; break;
      case "/marketplace": title = "Marketplace"; break;
      case "/about-us": title = "About us"; break;
      case "/account": title = "Account"; break;
      case "/login": title = "Login"; break;
      case "/register": title = "Register"; break;
      case "/idea": title = "Idea"; break;
      default: title = "Not found"; break;
    }
    document.title = title + (title.length === 0 ? "" : " - ") + "CreativityCrop";
  }, [location]);

  return (
    <div>
      <AuthContext.Provider value={[authContext, setAuthContext]}>
        <Routes>
          {/* Main route */}
          <Route path="/" element={<MainContent/>}>
            <Route index element={<Home/>}/>
            {/* Marketplace routes */}
            <Route path="marketplace" element={<Marketplace/>}>
              <Route index element={<MarketplaceIndex/>}/>
              <Route path="buy" element={<BuyView/>}>
                <Route index element={ <IdeasForSale/> } />
                <Route path=":ideaID" element={
                  <AuthenticatedRoute>
                    <ListedIdea/>
                  </AuthenticatedRoute>
                }/>
              </Route>
              <Route path="sell" element={
                <AuthenticatedRoute>
                  <SellView/>
                </AuthenticatedRoute>
              }/>
            </Route>
            {/* All other first level routes */}
            <Route path="about-us" element={<Aboutus/>}/>

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
            
            <Route path="account" element={
              <AuthenticatedRoute>
                <Account/>
              </AuthenticatedRoute>
            }/>
            <Route path="/idea/:ideaID" element={
              <AuthenticatedRoute>
                <Idea/>
              </AuthenticatedRoute>
            }/>
            <Route path="logout" element={ <Logout /> }/>
            {/* Route to display some error page when the route is not defined */}
            <Route path="*" element={<NotFound/>}/>
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

  if (!auth) {
    localStorage.setItem("redirect-back", location.pathname);
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return children;
}