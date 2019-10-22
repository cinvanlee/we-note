import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import SettingLayout from "./layout";
import { ThemePage, DemoPage } from "./pages";
import TestTabBarPage from "./pages/test-tabbar";

const Main = withRouter(props => <SettingLayout {...props} />);

export default ({ match }) => (
    <Main>
        <Switch>
            <Route
                path="/setting"
                exact
                render={() => <Redirect to="/setting/test-tabbar" />}
            />
            <Route path="/setting/theme" component={ThemePage} />
            <Route path="/setting/demo" component={DemoPage} />
            <Route path="/setting/test-tabbar" component={TestTabBarPage} />
        </Switch>
    </Main>
);
