import React from "react";
import { Route, Switch } from "react-router-dom";
import BuildInLayout from "./build-in/layout";
import Setting from "./modules/setting";
import NotePage from "./modules/note";
import WorklogPage from "./modules/worklog";
import CoderNewsPage from "./modules/coder-news";
import ToolPage from "./modules/tool";

export default (
    <Switch>
        <Route exact path="/" component={BuildInLayout} />
        <Route path="/note" component={NotePage} />
        <Route path="/setting" component={Setting} />
        <Route path="/worklog" component={WorklogPage} />
        <Route path="/coder-news" component={CoderNewsPage} />
        <Route path="/tool" component={ToolPage} />
    </Switch>
);
