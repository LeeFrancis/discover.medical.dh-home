import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { MFEContext } from "./mfe-component/context";

window.renderDHHome = arg => {
  return arg && typeof arg === "string" ? (
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      document.getElementById(arg)
    )
  ) : (
    <MFEContext.Provider value={{ mfeManager: arg }}>
      <App />
    </MFEContext.Provider>
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
