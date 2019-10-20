import React from "react";
import { DefaultButton } from "office-ui-fabric-react";
import { inject, observer } from "mobx-react";

@inject(stores => ({
    openInTabBar: stores.tabBar.open
}))
@observer
class DemoPage extends React.Component {
    openInTabBar = () => {
        this.props.openInTabBar({
            name: "百度一下",
            url: "www.baidu.com"
        });
    };

    render() {
        return (
            <div>
                <DefaultButton onClick={this.openInTabBar}>在 TabBar 中打开</DefaultButton>
            </div>
        );
    }
}

export default DemoPage;
