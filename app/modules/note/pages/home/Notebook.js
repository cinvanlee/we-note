import React from "react";
import { Icon, Dropdown, Menu } from "antd";
import classnames from "classnames";
import moment from "moment";

const { SubMenu } = Menu;

class Notebook extends React.Component {
    state = {
        rightClickId: null
    };

    static defaultProps = {
        onCreate: () => {},
        onSelect: () => {},
        onContextMenu: () => {}
    };

    render() {
        const { notes, activatedUuid } = this.props;
        const { rightClickId } = this.state;
        return (
            <div className="note">
                <div className="note-tools">
                    <span className="add-note">
                        <Icon type="plus" onClick={this.handleCreateClick} />
                    </span>
                </div>
                <div className="note-list">
                    {notes.map(note => {
                        const date = moment(note.created_at).format("YYYY-MM-DD");
                        const cls = classnames({
                            "note-item": true,
                            selected: note.uuid === rightClickId,
                            active: note.uuid === activatedUuid
                        });
                        return (
                            <Dropdown
                                key={note.uuid}
                                overlay={
                                    <Menu
                                        onClick={({ key }) => this.handleMenuClick(key, note.uuid)}
                                    >
                                        <Menu.Item key="show_in_finder">Show in Finder</Menu.Item>
                                        <Menu.Item key="delete_note">Delete Note</Menu.Item>
                                        <Menu.Divider />
                                        <SubMenu title="Export Note">
                                            <Menu.Item key="export_as_html">As HTML</Menu.Item>
                                            <Menu.Item key="export_as_md">As Markdown</Menu.Item>
                                            <Menu.Item key="export_as_pdf">As PDF</Menu.Item>
                                            <Menu.Item key="export_as_png">As PNG</Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                }
                                trigger={["contextMenu"]}
                                onVisibleChange={visible =>
                                    this.handleMenuToggle(visible, note.uuid)
                                }
                            >
                                <div
                                    className={cls}
                                    onClick={this.handleNoteSelect.bind(this, note.uuid)}
                                    title={note.title}
                                >
                                    <div className="note-item__name ellipsis">{note.title}</div>
                                    <div className="note-item__date">{date}</div>
                                </div>
                            </Dropdown>
                        );
                    })}
                </div>
            </div>
        );
    }

    handleCreateClick = async () => {
        this.props.onCreate();
    };

    handleNoteSelect = uuid => {
        const { activatedUuid } = this.props;
        if (uuid === activatedUuid) {
            return;
        }
        this.props.onSelect(uuid);
    };

    handleMenuClick = (key, uuid) => {
        this.props.onContextMenu(key, uuid);
    };

    handleMenuToggle = (visible, uuid) => {
        // TODO: 点击 Menu.Item 后不会触发
        this.setState({ rightClickId: visible ? uuid : null });
    };
}

export default Notebook;
