import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import AppContainer from "./App";

window.renderDHHome = (history, containerId) => {
  return (containerId ?
    ReactDOM.render(<AppContainer history={history} />,document.getElementById(containerId)) :
    <AppContainer history={history} />);
};
window.unmountDHHome = containerId => {
  const el = document.getElementById(containerId);
  if (el) ReactDOM.unmountComponentAtNode(el);
  else console.log(`${containerId} is already unmounted`);
};
