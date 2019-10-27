import React from "react";
// https://github.com/zenoamaro/react-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.less";

class RichEditorPage extends React.Component {
    state = {
        content: ""
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

    render() {
        const { content } = this.state;
        return (
            <div className="demo-rich-editor-page">
                <ReactQuill
                    theme="snow"
                    className="rich-editor"
                    modules={this.modules}
                    formats={this.formats}
                    value={content}
                    onChange={this.onEditorChange}
                />
            </div>
        );
    }

    onEditorChange = text => {
        this.setState({ content: text });
    };
}

export default RichEditorPage;
