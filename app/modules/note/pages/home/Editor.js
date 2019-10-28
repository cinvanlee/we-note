import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import moment from "moment";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";

class Editor extends React.Component {
    static defaultProps = {
        activatedUuid: PropTypes.string,
        noteInfo: PropTypes.object,
        onChange: () => {}
    };

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
                                width="100%"
                                height="100%"
                                value={noteInfo.content}
                                name="ACE_EDITOR"
                                mode="markdown"
                                theme="github"
                                onChange={this.handleEditorChange}
                                onPaste={this.handleEditorPaste}
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

    handleEditorPaste = text => {
        console.log(text);
    };

    savePastedImage = () => {
        // https://ourcodeworld.com/articles/read/491/how-to-retrieve-images-from-the-clipboard-with-javascript-in-the-browser
        // 1. 监听 clipboard
        // 2. 保存图片到本地
        // 3. 修改 note
    }
}

export default Editor;
