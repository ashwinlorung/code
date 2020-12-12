import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Portals from "./Portals/Portal";
import ToDo from "./Profiler/Profiler";
import RefExamples from "./Refs/Refs";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="links">
          <Link to="/portals">Portals</Link>
          <Link to="/profiler">Profiler</Link>
          <Link to="/refs">Refs</Link>
        </div>
        <Switch className="screen">
          <Route path="/portals">
            <Portals />
          </Route>
          <Route path="/profiler">
            <ToDo />
          </Route>
          <Route path="/refs">
            <RefExamples />
          </Route>
        </Switch>
      </Router>
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
