import React from "react";
import { FontIcon } from "office-ui-fabric-react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./style.scss";

class TabBar extends React.Component {
    render() {
        return (
            <div className="tabbar">
                <div className="tabbar-inner">
                    <div className="iframe-tabs">
                    </div>
                </div>
            </div>
        );
    }
}

export default TabBar;
