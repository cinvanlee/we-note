import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-dom";
import { initializeIcons } from "office-ui-fabric-react";
import history from "@/helper/history";

import "./global.scss";
import routes from "./routes";
import stores from "./stores";

initializeIcons();

class App extends React.Component {
    componentDidMount() {
        stores.tabBar.init();
    }

    render() {
        return (
            <Provider {...stores}>
                <Router history={history} ref="navigator">
                    {routes}
                </Router>
            </Provider>
        );
    }
}

render(<App />, document.getElementById("root"));
