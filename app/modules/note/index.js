import React from "react";

class NotePage extends React.Component {
    render() {
        return (
            <div>
                <div style={{ width: 2000, height: 80, background: "green" }}/>
                <div style={{ width: 80, height: 2000, background: "blue" }}/>
            </div>
        );
    }
}

export default NotePage;
