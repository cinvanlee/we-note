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
                        <div className="body-wrap-inner">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildInLayout;
