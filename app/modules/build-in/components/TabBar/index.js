import React from "react";
import { FontIcon } from "office-ui-fabric-react";
import "./style.scss";

class TabBar extends React.Component {
    render() {
        return (
            <div className="tabbar">
                <div className="iframe-tabs">
                    <div className="iframe-tab">
                        index.js
                        <FontIcon className="close-icon" iconName="small-cross" />
                    </div>
                    <div className="iframe-tab active">
                        style.scss
                        <FontIcon className="close-icon" iconName="small-cross" />
                    </div>
                </div>
            </div>
        );
    }
}

export default TabBar;
