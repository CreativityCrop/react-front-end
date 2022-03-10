/*                    Warning                    */
/*           This is work in progress            */

import { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';

import AuthProvider, { getToken } from "../AuthAPI";

const URL = `//creativitycrop.tech/api/admin/log?token=${getToken()}`;

export default function Admin() {
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if(ws !== null) {
            ws.onopen = () => {
                console.log('WebSocket Connected');
            }

            ws.onmessage = (e) => {
                const message = e.data + "\n";
                setMessages((prevMessages) => [message, ...prevMessages]);
            }

            return () => {
                ws.onclose = () => {
                    console.log('WebSocket Disconnected');
                }
            }
        }
    }, [ws]);

    useEffect(() => {
        switch(window.location.protocol) {
            case "https:": setWs(new WebSocket("wss:" + URL)); break;
            default: setWs(new WebSocket("ws:" + URL)); break;
        }
    }, []);

    return (
        <div className="mt-5 mb-20">
            <AuthProvider />
            <h1 className="mb-10 text-black text-center text-3xl">FastAPI uvicorn log</h1>
            <div className="overflow-y-auto ">
                {/* {messages.map(item => <p key={Date.now() + item}>{item}</p>)} */}
                <textarea className="w-full h-[30rem] " id="log" value={messages} />
            </div>
        </div>
    );
}