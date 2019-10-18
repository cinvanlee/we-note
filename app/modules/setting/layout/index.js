import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

class SettingLayout extends React.Component {
    render() {
        const menus = [
            {
                title: "UI 测试 Demo",
                icon: "",
                url: "/setting/demo"
            },
            {
                title: "Theme",
                icon: "",
                url: "/setting/theme"
            },
            {
                title: "Deploy",
                icon: "",
                url: "/setting/deploy"
            }
        ];
        return (
            <div className="setting-layout">
                <div className="setting-layout-menu">
                    {menus.map(menu => (
                        <Link
                            className="setting-layout-menu__link"
                            key={menu.url}
                            to={menu.url}
                        >
                            {menu.title}
                        </Link>
                    ))}
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
