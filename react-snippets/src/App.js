import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Portals from "./Portals/Portal";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to="/portals">Portals</Link>
        </div>
        <Switch>
          <Route path="/portals">
            <Portals />
          </Route>
        </Switch>
      </Router>
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
