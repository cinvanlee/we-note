import React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { ipcRenderer } from "electron";

class TestTabBarPage extends React.Component {
    componentDidMount() {
        ipcRenderer.on("ping", () => {
            ipcRenderer.sendToHost("pong");
        });
    }

    render() {
        return (
            <div>
                <h2>测试 TabBar</h2>
                <div style={{ marginBottom: 20 }}>当前Tab:</div>
                <div>
                    <DefaultButton
                        style={{ marginRight: 10 }}
                        text="发送消息"
                        onClick={this.sendMsgToHost}
                    />
                    <DefaultButton
                        style={{ marginRight: 10 }}
                        text="关闭当前Tab"
                    />
                    <DefaultButton
                        style={{ marginRight: 10 }}
                        text="关闭所有Tab"
                    />
                    <DefaultButton text="激活第二个Tab" />
                </div>
            </div>
        );
    }

    sendMsgToHost = () => {
        ipcRenderer.sendToHost("Message from tabbar");
    };
}

export default TestTabBarPage;
