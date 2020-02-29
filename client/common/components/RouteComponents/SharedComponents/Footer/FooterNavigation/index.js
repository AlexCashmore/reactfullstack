import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navigation from "../../../../UIComponents/Navigation";
import NavigationItemLink from "../../../../UIComponents/Navigation/NavigationItemLink";

import * as pageActions from "../../../../../actions/pageActions";

class FooterNavigation extends PureComponent {
    render() {
        return (
            <nav role="navigation" className="footer-navigation">
                <Navigation className="grid grid-gutters">
                </Navigation>
            </nav>
        );
    }
}

FooterNavigation.propTypes = {};
FooterNavigation.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterNavigation);