import React from "react";
import { Icon } from "antd";
import moment from "moment";
import classnames from "classnames";
import ReactQuill from "react-quill";
import _ from "lodash";
import noteUtil from "../../utils/note";
import "./style.less";

class HomePage extends React.Component {
    state = {
        notes: [],

        selectedNoteId: null,

        noteInfo: {},

        log: ""
    };

    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            ["clean"]
        ]
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image"
    ];

    async componentDidMount() {
        this.fetchAllNotes();
    }

    render() {
        const { notes, selectedNoteId, noteInfo, log } = this.state;
        return (
            <div className="note-home-page">
                <div className="note">
                    <div className="note-tools">
                        <span className="add-note">
                            <Icon type="plus" onClick={this.createNote} />
                        </span>
                    </div>
                    <div className="note-list">
                        {notes.map(note => {
                            const date = this.formatTime(note.created_at);
                            const cls = classnames({
                                "note-item": true,
                                active: note.uuid === selectedNoteId
                            });
                            return (
                                <div key={note.uuid} className={cls} onClick={this.selectNote.bind(this, note.uuid)}>
                                    <div className="note-item__name ellipsis">{note.title}</div>
                                    <div className="note-item__date">{date}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {selectedNoteId ? (
                    <div className="editor">
                        <div className="editor-meta">
                            <span>Created: {this.formatTime(noteInfo.created_at)}</span>
                            <span>Updated: {this.formatTime(noteInfo.created_at)}</span>
                        </div>
                        <div className="editor-area">
                            <div className="editor-area__inner">
                                <div className="editor-title">
                                    <input type="text" value={noteInfo.title} onChange={this.handleTitleChange} />
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    className="rich-editor"
                                    modules={this.modules}
                                    formats={this.formats}
                                    value={noteInfo.content}
                                    onChange={this.handleEditorChange}
                                />
                            </div>
                        </div>
                        <div className="editor-tools">{log}</div>
                    </div>
                ) : (
                    <div className="editor editor--empty">
                        <span>No Note Selected</span>
                    </div>
                )}
            </div>
        );
    }

    formatTime = timestamp => {
        return moment(timestamp).format("YYYY-MM-DD")
    };

    createNote = async () => {
        await noteUtil.create();
        this.fetchAllNotes();
    };

    fetchAllNotes = async () => {
        const notes = await noteUtil.listAll();
        await this.setState({ notes });
    };

    selectNote = async noteId => {
        const noteInfo = await noteUtil.getNoteById(noteId);
        await this.setState({ selectedNoteId: noteId, noteInfo });
    };

    handleTitleChange = async evt => {
        const { noteInfo } = this.state;
        await this.setState({
            log: "Saving...",
            noteInfo: {
                ...noteInfo,
                title: evt.target.value
            }
        });
        this.saveNote();
    };

    handleEditorChange = async content => {
        const { noteInfo } = this.state;
        await this.setState({
            log: "Saving...",
            noteInfo: {
                ...noteInfo,
                content
            }
        });
        this.saveNote();
    };

    saveNote = _.debounce(async () => {
        const { selectedNoteId, noteInfo } = this.state;
        const t1 = +new Date();
        await noteUtil.updateNoteById(selectedNoteId, noteInfo);
        await this.fetchAllNotes();
        const t2 = +new Date();
        await this.setState({ log: `Saved, spend ${t2 - t1}ms.` });
    }, 500);
}

export default HomePage;
