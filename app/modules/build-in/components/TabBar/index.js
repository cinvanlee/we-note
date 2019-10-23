import React from "react";
import { FontIcon } from "office-ui-fabric-react";
import classnames from "classnames";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject(stores => ({
    tabs: stores.tabBar.tabs,
    close: stores.tabBar.close,
    active: stores.tabBar.active
}))
@observer
class TabBar extends React.Component {
    render() {
        const { tabs } = this.props;
        return (
            <div className="tabbar">
                <div className="tabbar-inner">
                    <div className="tabs">{this.renderTabs(tabs)}</div>
                </div>
            </div>
        );
    }

    renderTabs = tabs => {
        const tabEls = [];
        tabs.forEach((tab, index) => {
            const cls = classnames({
                tab: true,
                active: tab.active
            });
            tabEls.push(
                <div
                    className={cls}
                    key={index}
                    onClick={this.handleTabClick.bind(this, tab)}
                >
                    {tab.name}
                    <div
                        className="tab-close"
                        onClick={this.handleClose.bind(this, tab)}
                    >
                        <FontIcon iconName="cancel" />
                    </div>
                </div>
            );
        });
        return tabEls;
    };

    handleTabClick = tab => {
        this.props.active(tab);
    };

    handleClose = (tab, evt) => {
        this.props.close(tab);
        evt.stopPropagation();
    };
}

export default TabBar;
