import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";
import "./style.less";

class Row extends React.Component {
    static propTypes = {
        gutter: PropTypes.number
    };

    static defaultProps = {
        gutter: 0
    };

    render() {
        const { gutter, children, className, style } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { gutter }));
        return (
            <div
                className={cls({
                    "we-ui-row": true,
                    [className]: className
                })}
                style={{
                    marginLeft: -gutter / 2,
                    marginRight: -gutter / 2,
                    ...style
                }}
            >
                {childrenWithProps}
            </div>
        );
    }
}

export default Row;
