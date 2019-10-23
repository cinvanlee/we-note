import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppearancePage from "./pages/Appearance";

export default () => (
    <Switch>
        <Route
            exact
            path="/build-in"
            render={() => <Redirect to="/build-in/appearance" />}
        />
        <Route path="/build-in/appearance" component={AppearancePage} />
    </Switch>
);
