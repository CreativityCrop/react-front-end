/*                    Warning                    */
/*           This is work in progress            */

import { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

import AuthProvider from "../AuthAPI";

const URL = "ws://creativitycrop.tech/api/admin/log";

export default function Admin() {
    const [messages, setMessages] = useState([]);
  	const [ws, setWs] = useState(new WebSocket(URL));

  	useEffect(() => {
	    ws.onopen = () => {
	      console.log('WebSocket Connected');
	    }

	    ws.onmessage = (e) => {
	      const message = e.data;
	      setMessages([message, ...messages]);
	    }

	    return () => {
	      ws.onclose = () => {
	        console.log('WebSocket Disconnected');
	        setWs(new WebSocket(URL));
	      }
	    }
  	}, [ws, messages]);

    return(
        <div className="mb-20">
            <AuthProvider/>
            {messages.map(item => <p key={item}>{item}</p>)}
        </div>
    );
}