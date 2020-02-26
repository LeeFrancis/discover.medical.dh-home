import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./App";
import { BrowserRouter } from "react-router-dom";

window.renderDHHome = containerId => {
  return containerId ? (
    ReactDOM.render(
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>,
      document.getElementById(containerId)
    )
  ) : (
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  );
};
