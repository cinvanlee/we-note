import React from "react";
import { Select, Row, Col, Button } from "antd";
import CodeMirror from "@/libs/codemirror";
import "./style.less";

const { Option } = Select;

class EditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.cm = React.createRef();
        this.state = {
            content: "function myScript(){return 100;}\n",
            languages: [],
            themes: [],
            options: {
                mode: "javascript",
                theme: "material",
                lineNumbers: true
            }
        };
    }

    componentDidMount() {
        const allMode = this.cm.getAllMode();
        const allTheme = this.cm.getAllTheme();
        const languages = allMode.map((item, index) => ({
            key: index,
            value: item.mode,
            label: item.name
        }));
        const themes = allTheme.map((item, index) => ({
            key: index,
            value: item,
            label: item
        }));
        this.setState({ languages, themes });
    }

    render() {
        const { content, options, languages, themes } = this.state;
        return (
            <div className="editor-page">
                <Row gutter={20}>
                    <Col span={4}>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={options.mode}
                            onChange={this.changeMod}
                        >
                            {languages.map((item, i) => (
                                <Option key={item.value} value={i}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            value={options.theme}
                            onChange={this.changeTheme}
                        >
                            {themes.map((item, i) => (
                                <Option key={i} value={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Button type="primary">应用</Button>
                    </Col>
                </Row>

                <div style={{ height: 20 }} />

                <CodeMirror
                    ref={ref => (this.cm = ref)}
                    value={content}
                    options={options}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({ content: value });
                    }}
                    onChange={this.handleCodeChange}
                />
            </div>
        );
    }

    changeMod = mode => {
        const { options } = this.state;
        const _options = {
            ...options,
            mode
        };
        this.cm.loadMode(mode);
        this.setState({ options: _options });
    };

    changeTheme = theme => {
        const { options } = this.state;
        const _options = {
            ...options,
            theme
        };
        this.cm.loadTheme(theme);
        this.setState({ options: _options });
    };

    handleCodeChange = (editor, data, value) => {
        console.log(editor, data, value);
    };
}

export default EditorPage;
