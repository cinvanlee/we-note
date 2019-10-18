import React from "react";
import { Icon } from "@blueprintjs/core";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import "./style.scss";

@withRouter
class SideBar extends React.Component {
    render() {
        const { pathname } = this.props.location;
        const configs = [
            {
                title: "笔记本",
                link: "/note",
                icon: "book"
            },
            {
                title: "工作",
                link: "/worklog",
                icon: "application"
            },
            {
                title: "热榜",
                link: "/coder-news",
                icon: "book"
            },
            {
                title: "工具",
                link: "/tool",
                icon: "grid-view"
            },
            {
                title: "设置",
                link: "/setting",
                icon: "cog",
                position: "bottom"
            }
        ];
        return (
            <div className="sidebar">
                {configs.map(menu => {
                    const cls = classnames({
                        "sidebar-item": true,
                        "sidebar-item--bottom": menu.position === "bottom",
                        "active": pathname.startsWith(menu.link)
                    });
                    return (
                        <Link
                            key={menu.link}
                            className={cls}
                            to={menu.link}
                            title={menu.title}
                        >
                            <Icon icon={menu.icon} iconSize={20} />
                            <div className="sidebar-item-title">{menu.title}</div>
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default SideBar;
