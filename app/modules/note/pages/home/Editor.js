import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import classnames from "classnames";
import * as MarkdownIt from "markdown-it";
import { message, Button, Icon, Row, Col, Dropdown, Menu } from "antd";
import moment from "moment";
import noteUtil from "@/modules/note/utils/note";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";

const ButtonGroup = Button.Group;

class Editor extends React.Component {
    static defaultProps = {
        activatedUuid: PropTypes.string,
        noteInfo: PropTypes.object,
        onChange: () => {}
    };

    constructor(props) {
        super(props);
        this.editor = null;
        this.md = new MarkdownIt();
        this.state = {
            editorFocus: false,
            mode: "edit",
            previewHTML: ""
        };
    }

    componentDidMount() {
        window.addEventListener("paste", this.pasteListener, false);
    }

    render() {
        const { mode, previewHTML } = this.state;
        const { activatedUuid, noteInfo } = this.props;
        return (
            <div className="editor">
                {!activatedUuid && (
                    <div className="editor--empty">
                        <span>No Note Selected</span>
                    </div>
                )}

                <div className="editor-meta">
                    <Row>
                        <Col span={8}>
                            <Dropdown
                                overlay={
                                    <Menu>
                                        <Menu.Item key="1">
                                            <span style={{ marginRight: 5 }}>⌘1</span>Single Panel
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <span style={{ marginRight: 5 }}>⌘2</span>Two Panel
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <span style={{ marginRight: 5 }}>⌘3</span>Three Panel
                                        </Menu.Item>
                                    </Menu>
                                }
                                trigger={["click"]}
                            >
                                <Icon type="menu" />
                            </Dropdown>
                        </Col>
                        <Col span={8} style={{ textAlign: "center" }}>
                            <ButtonGroup size="mini">
                                <Button
                                    type={mode === "edit" ? "primary" : ""}
                                    value="edit"
                                    onClick={this.handleModeChange.bind(this, "edit")}
                                >
                                    <Icon type="edit" />
                                </Button>
                                <Button
                                    type={mode === "preview" ? "primary" : ""}
                                    value="preview"
                                    onClick={this.handleModeChange.bind(this, "preview")}
                                >
                                    <Icon type="eye" />
                                </Button>
                                <Button
                                    type={mode === "multiple" ? "primary" : ""}
                                    value="multiple"
                                    onClick={this.handleModeChange.bind(this, "multiple")}
                                >
                                    <Icon type="reconciliation" />
                                </Button>
                            </ButtonGroup>
                        </Col>
                        <Col span={8} style={{ textAlign: "right" }}>
                            <span>Created: {moment(noteInfo.created_at).format("YYYY-MM-DD")}</span>
                            <span>Updated: {moment(noteInfo.updated_at).format("YYYY-MM-DD")}</span>
                        </Col>
                    </Row>
                </div>

                <div className="editor-bd">
                    <div
                        className={classnames({
                            editor__main: true,
                            hide: mode === "preview"
                        })}
                    >
                        <div className="editor-title">
                            <input
                                type="text"
                                value={noteInfo.title}
                                placeholder="Input note title here"
                                onChange={this.handleTitleChange}
                            />
                        </div>
                        <div className="editor-ace">
                            <AceEditor
                                wrapEnabled
                                showGutter
                                value={noteInfo.content}
                                onLoad={editor => (this.editor = editor)}
                                showPrintMargin={false}
                                width="100%"
                                height="100%"
                                name="ACE_EDITOR"
                                mode="markdown"
                                theme="github"
                                onChange={this.handleEditorChange}
                                onCursorChange={this.handleCursorChange}
                                onFocus={this.handleEditorFocus}
                                onBlur={this.handleEditorBlur}
                            />
                        </div>
                    </div>
                    <div
                        className={classnames({
                            editor__preview: true,
                            "markdown-body": true,
                            hide: mode === "edit"
                        })}
                    >
                        <div className="editor-title">
                            <div className="preview-title">{noteInfo.title}</div>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: previewHTML
                            }}
                        />
                    </div>
                </div>

                <div className="editor-tools"></div>
            </div>
        );
    }

    handleTitleChange = evt => {
        const { noteInfo } = this.props;
        this.props.onChange({
            ...noteInfo,
            title: evt.target.value
        });
    };

    handleEditorChange = content => {
        const { noteInfo } = this.props;
        this.props.onChange({
            ...noteInfo,
            content
        });
    };

    handleCursorChange = ({ cursor }) => {
        this.setState({
            cursor: {
                row: cursor.row,
                column: cursor.column
            }
        });
    };

    pasteListener = async evt => {
        const { activatedUuid } = this.props;
        const { editorFocus } = this.state;
        const items = evt.clipboardData.items;
        if (!editorFocus) {
            return;
        }
        if (!evt.clipboardData) {
            return;
        }
        if (!items) {
            return;
        }
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") === -1) {
                continue;
            }
            try {
                const blob = items[i].getAsFile();
                const imgUrl = await noteUtil.saveNoteImage(activatedUuid, blob);
                this.editor.insert(`\n![](${imgUrl})\n`);
            } catch (e) {
                message.error(e.message);
                break;
            }
        }
    };

    handleEditorFocus = () => {
        this.setState({ editorFocus: true });
    };

    handleEditorBlur = () => {
        this.setState({ editorFocus: false });
    };

    handleModeChange = async mode => {
        const { activatedUuid, noteInfo } = this.props;
        this.md.normalizeLink = text => {
            return noteUtil.getAssetFullPath(activatedUuid, text);
        };
        this.md.validateLink = function() {
            return true;
        };
        const previewHTML = this.md.render(noteInfo.content);
        this.setState({ mode, previewHTML });
    };
}

export default Editor;
