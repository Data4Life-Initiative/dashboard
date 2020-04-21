import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { NewsContainer } from "./containers";
import {
  LoginContainer,
  AdminLoginContainer,
  RegistrationContainer,
} from "./containers";

const App = (props, e) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NewsContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/adminlogin" component={AdminLoginContainer} />
        <Route exact path="/registration" component={RegistrationContainer} />
      </Switch>
    </div>
  );
};
export default App;
