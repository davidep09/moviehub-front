// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import App from "./App";
import "./index.css";
import Footer from "./components/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <div className="flex-grow">
            <React.StrictMode>
                <Auth0Provider
                    domain={import.meta.env.VITE_AUTH0_DOMAIN}
                    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
                    audience={import.meta.env.VITE_AUTH0_AUDIENCE}
                    authorizationParams={{
                        redirect_uri: window.location.origin + "/home"
                    }}
                >
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </Auth0Provider>
            </React.StrictMode>
        </div>
        <div>
            <Footer/>
        </div>
    </>
);