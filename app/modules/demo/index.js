import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import DemoLayout from "./layout";
import EditorPage from "./pages/editor";
import UiPage from "./pages/ui";

const Layout = withRouter(props => <DemoLayout {...props} />);

export default () => (
    <Layout>
        <Switch>
            <Route
                exact
                path="/demo"
                render={() => <Redirect to="/demo/editor" />}
            />
            <Route path="/demo/editor" component={EditorPage} />
            <Route path="/demo/ui" component={UiPage} />
        </Switch>
    </Layout>
);
