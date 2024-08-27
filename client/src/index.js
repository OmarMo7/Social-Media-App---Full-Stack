import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { reducers } from "./reducers";
import Theme from "./Theme.js";
import "./index.css";

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Theme />
  </Provider>,
  document.getElementById("root")
);
