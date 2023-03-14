import AppRouter from "./routes/AppRouter";
import { NavBar } from "./components";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, DataProvider, FilterProvider } from "./context";

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
