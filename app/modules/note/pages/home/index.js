import React from "react";
import _ from "lodash";
import Notebook from "./Notebook";
import Editor from "./Editor";
import noteUtil from "../../utils/note";
import "./style.less";

class HomePage extends React.Component {
    state = {
        notes: [],

        activatedUuid: null,

        noteInfo: {
            title: "",
            content: "",
            created_at: 0,
            updated_at: 0
        }
    };

    async componentDidMount() {
        this.fetchAllNotes();
    }

    render() {
        const { notes, activatedUuid, noteInfo } = this.state;
        return (
            <div className="note-home-page">
                <Notebook
                    activatedUuid={activatedUuid}
                    notes={notes}
                    onCreate={this.handleNoteCreate}
                    onSelect={this.handleNoteSelect}
                    onContextMenu={this.handleCtxMenu}
                />

                <Editor
                    activatedUuid={activatedUuid}
                    noteInfo={noteInfo}
                    onChange={this.handleNoteChange}
                />
            </div>
        );
    }

    fetchAllNotes = async () => {
        let notes = await noteUtil.listAll();
        notes = notes.sort((a, b) => {
            return b.created_at - a.created_at;
        });
        await this.setState({ notes });
    };

    handleNoteCreate = async () => {
        const created = await noteUtil.create();
        await this.fetchAllNotes();
        await this.handleNoteSelect(created.uuid);
    };

    handleNoteSelect = async noteId => {
        const noteInfo = await noteUtil.getNoteByUuid(noteId);
        await this.setState({ activatedUuid: noteId, noteInfo });
    };

    handleNoteChange = async noteInfo => {
        await this.setState({ noteInfo });
        this.saveNote();
    };

    handleCtxMenu = async (action, uuid) => {
        if (action === "show_in_finder") {
            noteUtil.showInFinder(uuid);
        }
        if (action === 'delete_note') {
            await noteUtil.deleteNoteByUuid(uuid);
            await this.fetchAllNotes();
        }
    };

    saveNote = _.debounce(async () => {
        const { activatedUuid, noteInfo } = this.state;
        await noteUtil.updateNoteByUuid(activatedUuid, noteInfo);
        await this.fetchAllNotes();
    }, 500);
}

export default HomePage;
