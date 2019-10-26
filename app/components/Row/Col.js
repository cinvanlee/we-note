import React from "react";
import PropTypes from "prop-types";

class Col extends React.Component {
    static propTypes = {
        xsSpan: PropTypes.number,
        smSpan: PropTypes.number,
        mdSpan: PropTypes.number,
        lgSpan: PropTypes.number,
        xsOffset: PropTypes.number,
        smOffset: PropTypes.number,
        mdOffset: PropTypes.number,
        lgOffset: PropTypes.number
    };

    static defaultProps = {
        gutter: 0
    };

    render() {
        const { xsSpan, smSpan, mdSpan, lgSpan, xsOffset, smOffset, mdOffset, lgOffset, gutter, children } = this.props;
        let cls = [];
        if (xsSpan) {
            cls.push(`weui-col-xs${xsSpan}`);
        }
        if (smSpan) {
            cls.push(`weui-col-sm${smSpan}`);
        }
        if (mdSpan) {
            cls.push(`weui-col-md${mdSpan}`);
        }
        if (lgSpan) {
            cls.push(`weui-col-lg${lgSpan}`);
        }
        if (xsOffset) {
            cls.push(`weui-col-xs-offset${xsOffset}`);
        }
        if (smOffset) {
            cls.push(`weui-col-sm-offset${smOffset}`);
        }
        if (mdOffset) {
            cls.push(`weui-col-md-offset${mdOffset}`);
        }
        if (lgOffset) {
            cls.push(`weui-col-lg-offset${lgOffset}`);
        }
        return (
            <div
                className={cls.join(" ")}
                style={{
                    paddingLeft: gutter / 2,
                    paddingRight: gutter / 2
                }}
            >
                {children}
            </div>
        );
    }
}

export default Col;
