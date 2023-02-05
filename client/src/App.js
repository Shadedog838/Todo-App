import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";

// components

import Login from "./components/Login";
import Register from "./components/Register";
import Dasboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes == true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={!isAuthenticated ? <Landing  /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dasboard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
