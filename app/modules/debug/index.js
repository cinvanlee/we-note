import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import DebugLayout from "./layout";
import ElectronPage from "./pages/electron";

const Layout = withRouter(props => <DebugLayout {...props} />);

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/debug" render={() => <Redirect to="/debug/electron" />} />
            <Route path="/debug/electron" component={ElectronPage} />
        </Switch>
    </Layout>
);
