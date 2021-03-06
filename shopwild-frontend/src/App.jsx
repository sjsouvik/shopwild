import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar/NavBar";

import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/auth-context";
import DataProvider from "./context/data-context";
import FilterProvider from "./context/filter-context";

import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <FilterProvider>
            <div className="App">
              <NavBar />

              <main>
                <AppRouter />
              </main>
            </div>
          </FilterProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
