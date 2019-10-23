import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-dom";
import { initializeIcons } from "office-ui-fabric-react";
import history from "@/helper/history";

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

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
