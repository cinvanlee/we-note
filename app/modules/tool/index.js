import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/home";
import JsonBeautifyPage from "./pages/json-beautify";

export default () => (
    <Switch>
        <Route exact path="/tool" render={() => <Redirect to="/tool/home" />} />
        <Route path="/tool/home" component={HomePage} />
        <Route path="/tool/json-beautify" component={JsonBeautifyPage} />
    </Switch>
);
