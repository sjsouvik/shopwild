import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import App from "./App";
import DataProvider from "./context/data-context";
import FilterProvider from "./context/filter-context";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <DataProvider>
      <FilterProvider>
        <Router>
          <App />
        </Router>
      </FilterProvider>
    </DataProvider>
  </StrictMode>,
  rootElement
);
