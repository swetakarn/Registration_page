import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux/userReducer"; 

import App from "./App";

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); 
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
