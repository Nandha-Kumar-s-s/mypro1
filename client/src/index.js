import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( <Auth0Provider
    domain="nandhuofficials.us.auth0.com"
    clientId="x5dZiwg2WcnqOl0MlAFabfEVnReR4X57"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>);
