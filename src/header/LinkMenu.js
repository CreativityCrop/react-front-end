import Link from './Link';
import { getToken } from '../AuthAPI'
import React from 'react';

export function LinkMenu() {
    return (
        <ul className="flex">
            <Link addr="/marketplace" text="Marketplace"/>
            <Link addr="/about-us" text="About us"/>
            <AuthenticatedLinks/>
        </ul>
    );
}

//TODO:very bad code, must change(maybe)
class AuthenticatedLinks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {auth: getToken()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        100
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        auth: getToken()
      });
    }
  
    render() {
        if(this.state.auth) {
            return <>
              <Link addr="/account" text="Account"/>
              <Link addr="/logout" text="Sign out"></Link>
            </>
        }
        else {
            return <>
              <Link addr="/login" text="Login"/>
              <Link addr="/register" text="Register"/>
            </>
        }
    }
}