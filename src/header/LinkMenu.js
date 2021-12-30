import Link from './Link';
import {fetchToken} from '../AuthAPI'
import React from 'react';

export function LinkMenu() {
    return (
        <ul className="flex">
            <Link addr="/" text="Home"/>
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
      this.state = {auth: fetchToken()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        500
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        auth: fetchToken()
      });
    }
  
    render() {
        if(this.state.auth) {
            return <Link addr="/account" text="Account"/>
        }
        else {
            return <>
                <Link addr="/login" text="Login"/>
                <Link addr="/register" text="Register"/>
            </>
        }
    }
}

