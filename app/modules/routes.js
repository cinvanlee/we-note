import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import BuildInLayout from "./build-in/layout";
import Note from "./note";
import Tool from "./tool";
import Worklog from "./worklog";
import Setting from "./setting";
import CoderNewsPage from "./coder-news";

const Main = withRouter(props => <BuildInLayout {...props} />);

export default () => (
    <Main>
        <Switch>
            <Route exact path="/note" component={Note} />
            <Route exact path="/tool" component={Tool} />
            <Route exact path="/worklog" component={Worklog} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/coder-news" component={CoderNewsPage} />
        </Switch>
    </Main>
);
