import React from "react";

class BlankLayout extends React.Component {
    render() {
        return <div className="blank-layout">{this.props.children}</div>;
    }
}

export default BlankLayout;
