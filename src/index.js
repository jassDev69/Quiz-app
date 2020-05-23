import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { UserProvider } from './components/userContext'
const user = {loggedIn: true }

ReactDOM.render(
    <UserProvider  value={user}>
        <App />
    </UserProvider>,
    document.getElementById("root")
);

// serviceWorker.unregister();