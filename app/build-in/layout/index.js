import React from "react";
import { SideBar, TabBar } from "../components";
import "./style.scss";

class BuildInLayout extends React.Component {
    render() {
        return (
            <div className="build-in-layout">
                <div className="sidebar-wrap">
                    <SideBar />
                </div>
                <div className="main-wrap">
                    <div className="tabbar-wrap">
                        <TabBar />
                    </div>
                    <div className="body-wrap">
                        {this.props.children}

                        <webview src="https://www.baidu.com/"></webview>

                        <webview src="http://0.0.0.0:1024/#/note"></webview>

                        <webview src="https://www.github.com/"></webview>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildInLayout;
