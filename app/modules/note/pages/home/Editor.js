import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import { message } from "antd";
import moment from "moment";
import noteUtil from "@/modules/note/utils/note";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";

class Editor extends React.Component {
    static defaultProps = {
        activatedUuid: PropTypes.string,
        noteInfo: PropTypes.object,
        onChange: () => {}
    };

    constructor(props) {
        super(props);
        this.editor = null;
        this.state = {
            cursor: null
        };
    }

    componentDidMount() {
        console.log(this.editor.insert);
        window.addEventListener("paste", this.pasteListener, false);
    }

    render() {
        const { activatedUuid, noteInfo } = this.props;
        return (
            <div className="editor">
                {!activatedUuid && (
                    <div className="editor--empty">
                        <span>No Note Selected</span>
                    </div>
                )}

                <div className="editor-meta">
                    <span>Created: {moment(noteInfo.created_at).format("YYYY-MM-DD")}</span>
                    <span>Updated: {moment(noteInfo.updated_at).format("YYYY-MM-DD")}</span>
                </div>

                <div className="editor-bd">
                    <div className="editor-bd__inner">
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
                                onLoad={editor => (this.editor = editor)}
                                width="100%"
                                height="100%"
                                value={noteInfo.content}
                                name="ACE_EDITOR"
                                mode="markdown"
                                theme="github"
                                onChange={this.handleEditorChange}
                                onCursorChange={this.handleCursorChange}
                            />
                        </div>
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
        const { cursor } = this.state;
        const items = evt.clipboardData.items;
        if (!cursor) {
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
                this.editor.insert(`\n\n![](${imgUrl})\n\n`);
            } catch (e) {
                message.error(e.message);
                break;
            }
        }
    };
}

export default Editor;
