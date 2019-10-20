import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import SettingLayout from "./layout";
import { ThemePage, DemoPage } from "./pages";

const Main = withRouter(props => <SettingLayout {...props} />);

export default ({ match }) => (
    <Main>
        <Switch>
            <Route
                path="/setting"
                exact
                render={() => <Redirect to="/setting/theme" />}
            />
            <Route path="/setting/theme" component={ThemePage} />
            <Route path="/setting/demo" component={DemoPage} />
        </Switch>
    </Main>
);
