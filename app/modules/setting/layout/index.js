import React from "react";
import { Link } from "react-router-dom";
import { SideBar } from '../components'
import "./style.scss";

class SettingLayout extends React.Component {
    render() {
        return (
            <div className="setting-layout">
                <div className="setting-layout-sidebar">
                    <SideBar />
                </div>
                <div className="setting-layout-main">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingLayout;
