import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./modules/build-in/layout/Default";
import HomePage from "./modules/home";
import BuildIn from "./modules/build-in";
import Tool from "./modules/tool";
import Debug from "./modules/debug";
import Navigation from "./modules/navigation";
import Note from "./modules/note";

const Layout = withRouter(props => <DefaultLayout {...props} />);

export default (
    <Layout>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/build-in" component={BuildIn} />
            <Route path="/tool" component={Tool} />
            <Route path="/debug" component={Debug} />
            <Route path="/navigation" component={Navigation} />
            <Route path="/note" component={Note} />
        </Switch>
    </Layout>
);
