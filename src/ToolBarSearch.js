import React from "react";
import ReactDOM from "react-dom";

export default () => {
  const toolBarSearchDiv = document.getElementById("toolbar-search");
  return toolBarSearchDiv
    ? ReactDOM.createPortal(
        <input placeholder="Search DynaHealth" type="text" />,
        toolBarSearchDiv
      )
    : null;
};
