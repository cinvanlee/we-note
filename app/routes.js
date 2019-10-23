import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./modules/build-in/layout/Default";
import HomePage from "./modules/home";
import BuildInModules from './modules/build-in';

const Layout = withRouter(props => <DefaultLayout {...props} />);

export default (
    <Layout>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/build-in" component={BuildInModules} />
        </Switch>
    </Layout>
);
