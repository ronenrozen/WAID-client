import React from "react";
import Users from "./Components/User/Users";
import Home from "./Components/Home";
import Rules from "./Components/Rule/Rules";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from "./Components/Settings/Settings";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="App-body">
          <Switch>
            <Route path="/rules">
              <Rules />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/control-panel">
              <Home />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
