import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { DashboradWrapperContainer } from "./containers/dashboard_wrapper_container";

import {
  LoginContainer,
  AdminLoginContainer,
  RegistrationContainer,
} from "./containers";

const App = (props, e) => {
  return (
    <Switch>
      <Route exact path="/" component={LoginContainer} />
      <Route
        exact
        path="/admin-dashboard"
        component={DashboradWrapperContainer}
      />
      <Route exact path="/adminlogin" component={AdminLoginContainer} />
      <Route exact path="/registration" component={RegistrationContainer} />
    </Switch>
  );
};
export default App;
