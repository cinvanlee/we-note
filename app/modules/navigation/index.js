import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/home";
import IframePage from "./pages/iframe";

export default () => (
    <Switch>
        <Route
            exact
            path="/navigation"
            render={() => <Redirect to="/navigation/home" />}
        />
        <Route path="/navigation/home" component={HomePage} />
        <Route path="/navigation/iframe" component={IframePage} />
    </Switch>
);
