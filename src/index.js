import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { reduxStore } from "./store/redux-store";
import App from "./App";

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
