import React from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import "./style.less";

@withRouter
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectKey: props.location.pathname,
            menus: [{ name: "CodeMirror", url: "/demo/editor" }, { name: "UI", url: "/demo/ui" }]
        };
    }

    render() {
        const { menus, selectKey } = this.state;
        return (
            <div className="demo-layout">
                <div className="demo-layout__menu">
                    <Menu onClick={this.handleMenuClick} selectedKeys={[selectKey]} style={{ height: "100%" }}>
                        {menus.map((item, i) => (
                            <Menu.Item key={item.url}>{item.name}</Menu.Item>
                        ))}
                    </Menu>
                </div>
                <div className="demo-layout__main">{this.props.children}</div>
            </div>
        );
    }

    handleMenuClick = ({ key }) => {
        this.props.history.push(key);
        this.setState({
            selectKey: key
        });
    };
}

export default Layout;
