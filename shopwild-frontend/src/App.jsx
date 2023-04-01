import AppRouter from "./routes/AppRouter";
import { NavBar, ErrorBoundary } from "./components";

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
                <ErrorBoundary>
                  <AppRouter />
                </ErrorBoundary>
              </main>
            </div>
          </FilterProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
