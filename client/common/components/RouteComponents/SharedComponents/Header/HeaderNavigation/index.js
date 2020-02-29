import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Navigation from "../../../../UIComponents/Navigation";
import NavigationItemLink from "../../../../UIComponents/Navigation/NavigationItemLink";

class HeaderNavigation extends PureComponent {
    render() {
        return (
            <nav role="navigation" className="header-navigation">
                <Navigation className="grid grid-center">
                    <NavigationItemLink
                        className="grid-cell grid-cell-autoSize"
                        link="/"
                        title="Dashboard"
                        itemName="Dashboard"
                        fontIconClass="fa"
                        iconClass="chart-area icon"
                    />
                </Navigation>
            </nav>
        );
    }
}

HeaderNavigation.propTypes = {};
HeaderNavigation.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        strings: state.strings.strings,
    };
}

export default connect(mapStateToProps)(HeaderNavigation);