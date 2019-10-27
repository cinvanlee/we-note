import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import DemoLayout from "./layout";
import EditorPage from "./pages/editor";
import UiPage from "./pages/ui";
import MdEditorPage from "./pages/md-editor";
import RichEditorPage from "./pages/rich-editor";

const Layout = withRouter(props => <DemoLayout {...props} />);

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/demo" render={() => <Redirect to="/demo/editor" />} />
            <Route path="/demo/editor" component={EditorPage} />
            <Route path="/demo/ui" component={UiPage} />
            <Route path="/demo/md-editor" component={MdEditorPage} />
            <Route path="/demo/rich-editor" component={RichEditorPage} />
        </Switch>
    </Layout>
);
