import React from "react";
import "./style.less";

class HomePage extends React.Component {
    render() {
        return (
            <div className="note-home-page">
                <div className="note">
                    <div className="note-item">
                        <div className="note-item__name ellipsis">Sprint20190909</div>
                        <div className="note-item__date">2019-09-09</div>
                    </div>
                    <div className="note-item">
                        <div className="note-item__name ellipsis">Sprint20190909</div>
                        <div className="note-item__date">2019-09-09</div>
                    </div>
                    <div className="note-item">
                        <div className="note-item__name ellipsis">Sprint20190909</div>
                        <div className="note-item__date">2019-09-09</div>
                    </div>
                    <div className="note-item">
                        <div className="note-item__name ellipsis">Sprint20190909</div>
                        <div className="note-item__date">2019-09-09</div>
                    </div>
                </div>
                <div className="editor">
                    {/*<div className="editor--empty">*/}
                    {/*    <span>未选择笔记</span>*/}
                    {/*</div>*/}
                    <div className="editor-meta">
                        <span>Created: 2019-09-09</span>
                        <span>Updated: 2019-09-09</span>
                    </div>
                    <div className="editor-content"></div>
                    <div className="editor-tools"></div>
                </div>
            </div>
        );
    }
}

export default HomePage;
