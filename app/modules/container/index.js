import React from "react";
import { Icon } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import "./style.scss";

class RootPage extends React.Component {
    render() {
        return (
            <div className="root-page">
                <div className="sidebar">
                    <Link to="/note">
                        <div className="sidebar-item" title="笔记本">
                            <Icon icon="book" iconSize={20} />
                        </div>
                    </Link>
                    <Link to="/worklog">
                        <div className="sidebar-item" title="工作日志">
                            <Icon icon="application" iconSize={20} />
                        </div>
                    </Link>
                    <Link to="/coder-news">
                        <div className="sidebar-item" title="热榜">
                            <Icon icon="star" iconSize={20} />
                        </div>
                    </Link>
                    <Link to="/tool">
                        <div className="sidebar-item" title="工具">
                            <Icon icon="grid-view" iconSize={20} />
                        </div>
                    </Link>

                    <Link to="/setting">
                        <div className="sidebar-item fixed-bottom" title="设置">
                            <Icon icon="cog" iconSize={20} />
                        </div>
                    </Link>
                </div>

                <div className="main">
                    <div className="main-body">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default RootPage;
