import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import EditorPage from "./pages/editor";
import DemoLayout from "./layout";

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
        </Switch>
    </Layout>
);
