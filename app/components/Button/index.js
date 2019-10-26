import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./style.less";

class Button extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(["default", "primary", "info", "warning", "danger"]),
        size: PropTypes.oneOf(["lg", "md", "sm", "xs"]),
        disabled: PropTypes.bool,
        round: PropTypes.bool
    };

    static defaultProps = {
        type: "default",
        size: "md",
        disabled: false,
        round: false
    };

    render() {
        const { type, size, disabled, round, children } = this.props;
        const cls = classnames({
            "weui-btn": true,
            [`weui-btn-${type}`]: type,
            [`weui-btn-${size}`]: size,
            "weui-btn-disabled": disabled,
            "weui-btn-round": round
        });
        return <button className={cls}>{children}</button>;
    }
}

export default Button;
