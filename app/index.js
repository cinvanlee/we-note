import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { HashRouter } from "react-router-dom";
import { initializeIcons } from "office-ui-fabric-react";

import "./global.scss";
import routes from "./routes";
import stores from "./stores";

initializeIcons();

class App extends React.Component {
    async componentDidMount() {
        await stores.tabBar.init();
    }

    render() {
        return (
            <Provider {...stores}>
                <HashRouter ref="navigator">{routes}</HashRouter>
            </Provider>
        );
    }
}

render(<App />, document.getElementById("root"));
