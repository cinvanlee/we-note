import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import DemoLayout from "./layout";
import UiPage from "./pages/ui";
import AceEditorPage from "./pages/ace-editor";

const Layout = withRouter(props => <DemoLayout {...props} />);

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/demo" render={() => <Redirect to="/demo/editor" />} />
            <Route path="/demo/ui" component={UiPage} />
            <Route path="/demo/ace-editor" component={AceEditorPage} />
        </Switch>
    </Layout>
);
