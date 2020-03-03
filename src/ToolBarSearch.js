import React from "react";
import ReactDOM from "react-dom";

export default () =>
  ReactDOM.createPortal(
    <input placeholder="Search DynaHealth" type="text" />,
    document.getElementById("toolbar-search")
  );
