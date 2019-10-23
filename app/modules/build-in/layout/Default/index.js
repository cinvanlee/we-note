import React from "react";
import SideMenu from "../../components/SideMenu";
import TabBar from "../../components/TabBar";
import "./style.less";

class BuildInLayout extends React.Component {
    render() {
        return (
            <div className="build-in-layout">
                <div className="side-menu-wrap">
                    <SideMenu />
                </div>
                <div className="main-wrap">
                    <div className="tabbar-wrap">
                        <TabBar />
                    </div>
                    <div className="body-wrap">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildInLayout;
