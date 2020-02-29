import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Navigation from "../../../../UIComponents/Navigation";
import NavigationItemLink from "../../../../UIComponents/Navigation/NavigationItemLink";

class HeaderContentNavigation extends PureComponent {
    get getItems() {
        const { items } = this.props;

        return items.map((item, key) => {
            const itemCellProps = {
                className: `grid-cell${item.className ? ` ${item.className}` : ""}`,
                link: item.link || "",
                title: item.title || "",
                itemName: item.name || "",
                style: item.style || {},
                useParentMatching: false,
            };
            return <NavigationItemLink key={key} {...itemCellProps}>{item.content ? item.content : item.label ? item.label : null}</NavigationItemLink>;
        });
    }

    render() {
        return (
            <nav role="navigation" className="header-content-navigation">
                <Navigation className="grid grid-full md-grid-fit grid-center">
                    {this.getItems}
                </Navigation>
            </nav>
        );
    }
}

HeaderContentNavigation.propTypes = {
    items: PropTypes.array,
};

HeaderContentNavigation.defaultProps = {
    items: [],
};
HeaderContentNavigation.contextTypes = {
    router: PropTypes.object.isRequired,
};
export default HeaderContentNavigation;