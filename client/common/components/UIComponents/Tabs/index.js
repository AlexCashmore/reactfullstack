import React, { Component } from "react";
import PropTypes from "prop-types";

class Tabs extends Component {
    componentWillMount() {
        const { defaultTabKey, children } = this.props;
        const tabs = React.Children.toArray(children);
        this.setState({
            selectedTab: defaultTabKey || tabs[0].props.tabKey,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { selectedTab } = this.state;
        if(nextProps.selectedTab && nextProps.selectedTab !== selectedTab) {
            this.changeTab(nextProps.selectedTab).call();
        }
    }

    get isActive() {
        const { selectedTab } = this.state;
        return tabKey => selectedTab === tabKey;
    }

    get classNameActive() {
        return tabKey => (this.isActive(tabKey) ? " active" : "");
    }

    get classNameTabButton() {
        return tabKey => `tab-button${this.classNameActive(tabKey)}`;
    }

    get classNameTabContainer() {
        return (tabKey, className) => `tab-container${className ? ` ${className}` : ""}${this.classNameActive(tabKey)}`;
    }

    changeTab(tabKey) {
        return () => {
            const { onChange } = this.props;
            this.setState({
                selectedTab: tabKey,
            });
            if(typeof onChange === "function") {
                onChange(tabKey);
            }
        };
    }

    render() {
        const { disableNavigation, keepTabsMounted, children } = this.props;
        const { selectedTab } = this.state;
        const tabs = React.Children.toArray(children);
        return (
            <div className="tabs">
                {
                    !disableNavigation ? (
                        <div className="tabs-navigation">
                            {
                                tabs.map(value => (
                                    <div
                                        key={value.props.tabKey}
                                        className={this.classNameTabButton(value.props.tabKey)}
                                        onClick={this.changeTab(value.props.tabKey)}
                                    >
                                        {value.props.button}
                                    </div>
                                ))
                            }
                        </div>
                    ) : null
                }
                <div className="tabs-content">
                    {
                        tabs.map(value => (keepTabsMounted || value.props.tabKey === selectedTab
                            ? <div key={value.props.tabKey} className={this.classNameTabContainer(value.props.tabKey, value.props.className)}>{value}</div> : null))
                    }
                </div>

            </div>
        );
    }
}

Tabs.propTypes = {
    selectedTab: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    defaultTabKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    onChange: PropTypes.func,
    keepTabsMounted: PropTypes.bool,
    disableNavigation: PropTypes.bool,
};
Tabs.defaultProps = {
    selectedTab: 0,
    defaultTabKey: 0,
    keepTabsMounted: true,
    disableNavigation: false,
    onChange: null,
};
Tabs.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Tabs;