import React from "react";
import { FontIcon } from "office-ui-fabric-react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import "./style.scss";

@withRouter
class SideBar extends React.Component {
    render() {
        const { pathname } = this.props.location;
        const configs = [
            {
                name: "笔记本",
                url: "/note",
                icon: "ZipFolder"
            },
            {
                name: "工作",
                url: "/worklog",
                icon: "work"
            },
            {
                name: "热榜",
                url: "/coder-news",
                icon: "News"
            },
            {
                name: "工具",
                url: "/tool",
                icon: "OEM"
            },
            {
                name: "设置",
                url: "/setting",
                icon: "Settings",
                position: "bottom"
            }
        ];
        return (
            <div className="sidebar">
                {configs.map(menu => {
                    const cls = classnames({
                        "sidebar-item": true,
                        "sidebar-item--bottom": menu.position === "bottom",
                        active: pathname.startsWith(menu.url)
                    });
                    return (
                        <div
                            key={menu.url}
                            className={cls}
                            title={menu.title}
                        >
                            <FontIcon iconName={menu.icon} iconSize={20}/>
                            <div className="sidebar-item-title">
                                {menu.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SideBar;
