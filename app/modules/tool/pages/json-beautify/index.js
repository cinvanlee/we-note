import React from "react";
import { TextField } from "office-ui-fabric-react";
import "./style.scss";

class JsonBeautifyPage extends React.Component {
    state = {
        output: ""
    };

    render() {
        const { output } = this.state;
        return (
            <div className="json-beautify-page">
                <div className="input-area">
                    <p>输入: </p>
                    <TextField
                        multiline
                        autoAdjustHeight
                        rows={25}
                        onChange={this.beautifyJSON}
                    />
                </div>
                <div className="output-area">
                    <p>输出: </p>
                    <pre dangerouslySetInnerHTML={{ __html: output }} />
                </div>
            </div>
        );
    }

    beautifyJSON = (evt, text) => {
        let json;
        let output;
        try {
            json = JSON.parse(text);
            output = json;
        } catch (e) {
            console.log(e);
            output = <span className="error-message">Error: 格式错误</span>;
        }
        this.setState({ output });
    };
}

export default JsonBeautifyPage;
