import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

export const titleContext = React.createContext();

ReactDOM.render(
  <React.Fragment>
    <titleContext.Provider value="React Hook">
      <App />
    </titleContext.Provider>
  </React.Fragment>,
  document.getElementById("root")
);
