import React from "react";
import { Router } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import routes from "./routes/routes";
import history from "./routes/history";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router history={history}>{routes}</Router>
    </div>
  );
};

export default App;
