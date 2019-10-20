import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import BuildInLayout from "./build-in/layout";
import Setting from "./modules/setting";
import NotePage from "./modules/note";

const Main = withRouter(props => <BuildInLayout {...props} />);

export default (
    <Switch>
        <Route exact path="/" component={BuildInLayout} />
        <Route path="/note" component={NotePage} />
        <Route path="/setting" component={Setting} />
    </Switch>
);
