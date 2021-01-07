import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./compontents/App";
import Firebase, { FireBaseContext } from "./compontents/Firebase";

ReactDOM.render(
  <FireBaseContext.Provider value={new Firebase()}>
    <App />
  </FireBaseContext.Provider>,
  document.getElementById("root")
);
