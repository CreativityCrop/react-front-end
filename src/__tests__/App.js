import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from '../App';

it('renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
        div
    );
});