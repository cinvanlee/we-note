import React from "react";
import { Icon } from "@blueprintjs/core";
import "./style.scss";

class TabBar extends React.Component {
    render() {
        return (
            <div className="tabbar">
                <div className="iframe-tabs">
                    <div className="iframe-tab">
                        index.js
                        <Icon className="close-icon" icon="small-cross" />
                    </div>
                    <div className="iframe-tab active">
                        style.scss
                        <Icon className="close-icon" icon="small-cross" />
                    </div>
                </div>
            </div>
        );
    }
}

export default TabBar;
