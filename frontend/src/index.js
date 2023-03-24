import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from "./index.css"
import {BrowserRouter as Router} from "react-router-dom"
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="358339989609-vtsmkvkm2mr70e197p1bn2mofkimabaj.apps.googleusercontent.com">
        <Router basename="/">
        <App/>
        </Router>
    </GoogleOAuthProvider>
);