import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import "./style.less";

class Card extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    render() {
        const { title, children, style, className } = this.props;
        return (
            <div
                className={cls({
                    "we-card": true,
                    [className]: className
                })}
                style={style}
            >
                {title && <div className="we-card-header">{title}</div>}
                <div className="we-card-body">{children}</div>
            </div>
        );
    }
}

export default Card;
