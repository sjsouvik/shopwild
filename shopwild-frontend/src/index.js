import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import App from "./App";
import DataProvider from "./context/data-context";
import FilterProvider from "./context/filter-context";
import AuthProvider from "./context/auth-context";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
