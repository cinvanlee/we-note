import React from "react";
import { Icon } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./style.scss";

class SideBar extends React.Component {
    render() {
        const configs = [
            {
                title: "笔记本",
                link: "/note",
                icon: "book"
            },
            {
                title: "工作日志",
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
                        "fixed-bottom": menu.position === "bottom"
                    });
                    return (
                        <Link
                            key={menu.link}
                            className={cls}
                            to={menu.link}
                            title={menu.title}
                        >
                            <Icon icon={menu.icon} iconSize={20} />
                        </Link>
                    );
                })}
            </div>
        );
    }
}

export default SideBar;
