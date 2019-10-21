import React from "react";
import { inject, observer } from "mobx-react";
import classnames from "classnames";
import { SideBar, TabBar } from "../components";
import "./style.scss";

@inject(stores => ({
    iframes: stores.tabBar.iframes
}))
@observer
class BuildInLayout extends React.Component {
    render() {
        const { iframes } = this.props;
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
                        <div className="body-wrap-inner">
                            {iframes.map((iframe, index) => {
                                const cls = classnames({
                                    "iframe-wrap": true,
                                    active: iframe.active
                                });
                                return (
                                    <webview
                                        className={cls}
                                        key={index}
                                        src={`#${iframe.url}`}
                                        nodeintegration={1}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildInLayout;
