import React from "react";
import { withRouter } from "react-router-dom";
import { Spin, Alert } from "antd";
import * as qs from "query-string";
import "./style.less";

@withRouter
class IframePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fail: false,
            url: this.getIframeUrl(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        const nextUrl = this.getIframeUrl(nextProps);
        const thisUrl = this.getIframeUrl(this.props);
        if (nextUrl && nextUrl !== thisUrl) {
            this.reload(nextUrl);
        }
    }

    render() {
        const { url } = this.state;
        // caches webview
        return (
            <div className="nav-iframe-page">
                <webview className="webview" src={url} nodeintegration={1} />
            </div>
        );
    }

    getIframeUrl = props => {
        return qs.parse(props.location.search).url;
    };

    reload = async url => {
        await this.setState({ loading: true });
        const webview = document.querySelector("webview");
        webview.stop();
        webview.loadURL(url);
    };
}

export default IframePage;
