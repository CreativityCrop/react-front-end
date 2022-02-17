import { useState, useEffect } from "react";

import AuthProvider from "../AuthAPI";

const URL = "ws://creativitycrop.tech:8000/admin/log";

export default function Admin() {
    const [messages, setMessages] = useState([]);
    const [ws, ] = useState(new WebSocket(URL));

    useEffect(() => {
        ws.onopen = () => {
            console.log('WebSocket Connected');
        }
    
        ws.onmessage = (e) => {
            setMessages((prevMessage) => [JSON.parse(e.data), ...prevMessage]);
        }
    
        // return () => {
        //     ws.onclose = () => {
        //         console.log('WebSocket Disconnected');
        //         setWs(new WebSocket(URL));
        //     }
        // }
    }, [ws]);

    return(
        <div>
            <AuthProvider/>
            {messages}
        </div>
    );
}