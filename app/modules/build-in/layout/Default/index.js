import React from "react";
import SideMenu from "../../components/SideMenu";
import TabBar from "../../components/TabBar";
import "./style.scss";

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
