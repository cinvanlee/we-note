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
                                    onClick={this.handleTabClick.bind(
                                        this,
                                        iframe
                                    )}
                                    onContextMenu={this.handleTabRightClick}
                                >
                                    {iframe.name}
                                    <div
                                        className="iframe-tab-close"
                                        onClick={this.handleCloseIconClick.bind(
                                            this,
                                            iframe
                                        )}
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

    handleTabClick = iframe => {
        this.props.activeTabBar(iframe);
    };

    handleTabRightClick = () => {
        console.log("right click");
    };

    handleCloseIconClick = (evt, iframe) => {
        this.props.closeTabBar(iframe);
        evt.stopPropagation();
    };
}

export default TabBar;
