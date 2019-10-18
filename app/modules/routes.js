import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import BuildInLayout from "./build-in/layout";
import Setting from "./setting";

const Main = withRouter(props => <BuildInLayout {...props} />);

export default (
    <Main>
        <Switch>
            <Route path="/setting" component={Setting} />
        </Switch>
    </Main>
);
