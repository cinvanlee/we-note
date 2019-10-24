import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/home";

export default () => (
    <Switch>
        <Route exact path="/note" render={() => <Redirect to="/note/home" />} />
        <Route path="/note/home" component={HomePage} />
    </Switch>
);
