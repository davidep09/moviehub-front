// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-46eceomc6lg0vp4m.eu.auth0.com"
            clientId="gGpv0iVrQVLk0ylFnTOJ3rH47OrMUaaa"
            audience="https://dev-46eceomc6lg0vp4m.eu.auth0.com/api/v2/"
            authorizationParams={{
                redirect_uri: window.location.origin + "/home"
            }}
        >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>
);