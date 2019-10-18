import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { HashRouter } from "react-router-dom";

import "./global.scss";
import routes from "./modules/routes";
import stores from "./modules/stores";

class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <HashRouter ref="navigator">{routes}</HashRouter>
            </Provider>
        );
    }
}

render(<App />, document.getElementById("root"));
