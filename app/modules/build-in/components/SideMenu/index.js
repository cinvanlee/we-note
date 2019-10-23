import React from "react";
import { Icon } from "antd";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { navigateTo } from "@/helper/utils";
import "./style.less";

@withRouter
class SideMenu extends React.Component {
    render() {
        const { pathname } = this.props.location;
        const configs = [
            {
                name: "笔记本",
                url: "/note",
                icon: "book"
            },
            {
                name: "Demo",
                url: "/demo",
                icon: "bug"
            },
            {
                name: "热榜",
                url: "/coder-news",
                icon: "fire"
            },
            {
                name: "导航",
                url: "/navigation",
                icon: "alert"
            },
            {
                name: "工具",
                url: "/tool",
                icon: "tool"
            },
            {
                name: "设置",
                url: "/build-in",
                icon: "setting",
                position: "bottom"
            }
        ];
        return (
            <div className="side-menu">
                {configs.map(menu => {
                    const cls = classnames({
                        "side-menu-item": true,
                        "side-menu-item--bottom": menu.position === "bottom",
                        active: pathname.startsWith(menu.url)
                    });
                    return (
                        <div
                            key={menu.url}
                            className={cls}
                            title={menu.title}
                            onClick={() => navigateTo(menu)}
                        >
                            <Icon type={menu.icon} style={{ fontSize: 16 }} />
                            <div className="side-menu-item-title">
                                {menu.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SideMenu;
