import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import Counter from "./counter";

export default () => (
    <Switch>
        <Route exact path="/" component={Counter} />
    </Switch>
);
