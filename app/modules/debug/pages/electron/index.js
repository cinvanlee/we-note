import React from "react";
import { Card, Button, Modal, Input } from "antd";
import appUtil from "@/helper/app";
import "./style.less";

class ElectronPage extends React.Component {
    state = {
        hexoPathModalVisible: false,
        hexoPath: ""
    };

    render() {
        const { hexoPath, hexoPathModalVisible } = this.state;
        return (
            <div className="debug-electron-page">
                <Card title="Electron">
                    <Button type="primary" onClick={this.quitApp}>
                        退出
                    </Button>
                </Card>

                <Card title="WeNote">
                    <Button type="primary" onClick={this.getAppPath}>
                        获取当前APP路径
                    </Button>

                    <Button type="primary" onClick={this.getAppLanguage}>
                        获取语言
                    </Button>

                    <Button type="primary" onClick={this.initApp}>
                        初始化APP
                    </Button>

                    <Button type="primary" onClick={this.getAppConfig}>
                        获取配置文件
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => {
                            this.setState({ hexoPathModalVisible: true });
                        }}
                    >
                        设置 Hexo 路径
                    </Button>
                </Card>

                <Modal
                    title="设置 Hexo 路径"
                    visible={hexoPathModalVisible}
                    onOk={this.setHexoPath}
                    onCancel={this.closeHexoModal}
                >
                    <Input
                        value={hexoPath}
                        onChange={evt => {
                            this.setState({
                                hexoPath: evt.target.value
                            });
                        }}
                    />
                </Modal>
            </div>
        );
    }

    displayJSON = json => {
        return (
            <div>
                <pre>
                    <code>{JSON.stringify(json, null, 4)}</code>
                </pre>
            </div>
        );
    };

    quitApp = () => {
        appUtil.quit();
    };

    getAppPath = () => {
        Modal.info({
            title: "当前APP路径为: ",
            content: appUtil.getAppPath()
        });
    };

    initApp = async () => {
        try {
            const config = await appUtil.initAppDir();
            Modal.success({
                title: "Success",
                content: this.displayJSON(config)
            });
        } catch (e) {
            Modal.error({
                title: "Error",
                content: e.message
            });
        }
    };

    getAppLanguage = async () => {
        try {
            const language = await appUtil.getAppConfig("language");
            Modal.success({
                title: "Success",
                content: language
            });
        } catch (e) {
            Modal.error({
                title: "Error",
                content: e.message
            });
        }
    };

    getAppConfig = async () => {
        try {
            const config = await appUtil.getAppConfig();
            Modal.success({
                title: "Success",
                content: this.displayJSON(config)
            });
        } catch (e) {
            Modal.error({
                title: "Error",
                content: e.message
            });
        }
    };

    closeHexoModal = async () => {
        await this.setState({
            hexoPath: "",
            hexoPathModalVisible: false
        });
    };

    setHexoPath = async () => {
        const { hexoPath } = this.state;
        await appUtil.setAppConfig("hexo.path", hexoPath);
        await this.closeHexoModal();
        this.getAppConfig();
    };
}

export default ElectronPage;
