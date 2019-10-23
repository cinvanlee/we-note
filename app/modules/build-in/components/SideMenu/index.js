import React from "react";
import { FontIcon } from "office-ui-fabric-react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { navigateTo } from "@/helper/utils";
import "./style.scss";

@withRouter
class SideMenu extends React.Component {
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
                url: "/build-in",
                icon: "Settings",
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
                            <FontIcon iconName={menu.icon} iconSize={20} />
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
