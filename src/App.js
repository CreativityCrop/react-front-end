import { Header } from './header/Header.js';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { fetchToken } from './AuthAPI';

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
  return (
    <div>
        <Header/>

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
    </div>
  );
}

export function AuthenticationRoute({children}) {
  let auth = fetchToken();
  let location = useLocation();

  if(auth) {
    return <Navigate to="/account" state={{ from: location }}/>;
  }

  return children;
}

export function AuthenticatedRoute({children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    localStorage.setItem("redirect-back", location.pathname);
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  return children;
}