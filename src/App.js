import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { NewsContainer } from "./containers";
import { LoginContainer } from "./containers";

const App = (props, e) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NewsContainer} />
        <Route exact path="/login" component={LoginContainer} />
      </Switch>
    </div>
  );
};
export default App;
