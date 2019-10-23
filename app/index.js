import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import history from "@/helper/history";

import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.less";

import "./global.less";
import routes from "./routes";
import stores from "./stores";

moment.locale("zh-cn");

class App extends React.Component {
    componentDidMount() {
        stores.tabBar.init();
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Provider {...stores}>
                    <Router history={history} ref="navigator">
                        {routes}
                    </Router>
                </Provider>
            </ConfigProvider>
        );
    }
}

render(<App />, document.getElementById("root"));
