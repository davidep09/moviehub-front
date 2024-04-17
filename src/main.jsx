// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import App from "./App";
import config from "./config/auth0_config.json";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain={config.domain}
            clientId={config.clientId}
            redirectUri={window.location.origin}
        >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>
);