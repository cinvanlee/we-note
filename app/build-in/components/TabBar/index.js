import React from "react";
import { FontIcon } from "office-ui-fabric-react";
import classnames from "classnames";
import { inject, observer } from "mobx-react";
import "./style.scss";

@inject(stores => ({
    iframes: stores.tabBar.iframes,
    activeTabBar: stores.tabBar.active,
    closeTabBar: stores.tabBar.close
}))
@observer
class TabBar extends React.Component {
    render() {
        const { iframes } = this.props;
        return (
            <div className="tabbar">
                <div className="tabbar-inner">
                    <div className="iframe-tabs">
                        {iframes.map((iframe, index) => {
                            const cls = classnames({
                                "iframe-tab": true,
                                "iframe-tab--disableClose": iframe.disableClose,
                                active: iframe.active
                            });
                            return (
                                <div
                                    key={index}
                                    className={cls}
                                    onClick={() =>
                                        this.props.activeTabBar(iframe)
                                    }
                                >
                                    {iframe.name}
                                    <div
                                        className="iframe-tab-close"
                                        onClick={() =>
                                            this.props.closeTabBar(iframe)
                                        }
                                    >
                                        <FontIcon iconName="cancel" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default TabBar;
