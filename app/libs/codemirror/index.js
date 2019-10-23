import React from "react";
import cm from "codemirror";
import electron from "electron";
import fs from "fs";
import path from "path";
import modeInfo from "./mode-info";

// themes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./style.less";

// modes
import "codemirror/mode/javascript/javascript";

class CodeMirror extends React.Component {
    static defaultProps = {
        options: {},
        value: "",
        onChange: () => {}
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.editor = cm(this.ref);
        const { options, value } = this.props;

        // set options
        const _options = Object.assign({}, cm.defaults, options);
        Object.keys(_options).forEach(key => {
            this.editor.setOption(key, _options[key]);
        });

        // set value
        if (value) {
            this.editor.setValue(value);
        }

        // bind events
        this.editor.on("change", (cm, data) => {
            this.props.onChange(this.editor, data, this.editor.getValue());
        });
    }

    loadMode = mode => {
        import(`codemirror/mode/${mode}/${mode}.js`);
        this.editor.setOption("mode", mode);
    };

    loadTheme = theme => {
        import(`codemirror/theme/${theme}.css`);
        this.editor.setOption("theme", theme);
    };

    getAllMode = () => {
        return modeInfo;
    };

    getAllTheme = () => {
        const themes = [];
        try {
            const themePath = path.join(
                electron.remote.app.getAppPath(),
                "/node_modules/codemirror/theme"
            );
            const files = fs.readdirSync(themePath);
            files.forEach(file => {
                themes.push(file.replace(".css", ""));
            });
        } catch (e) {
            console.log(e);
            // ignore
        }
        return themes;
    };

    render() {
        const className = `wn-codemirror ${this.props.className}`;
        const style = this.props.styles || {};
        return (
            <div
                className={className}
                style={style}
                ref={ref => (this.ref = ref)}
            />
        );
    }
}

export default CodeMirror;
