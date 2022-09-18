import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import Header from "./features/shared/components/Header";
import "./App.css";
import "antd/dist/antd.min.css";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
