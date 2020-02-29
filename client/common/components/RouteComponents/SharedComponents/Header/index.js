import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Moment from "react-moment";
import Logo from "../../../Assets/Logo";

import HeaderRightNavigation from "./HeaderRightNavigation";

import * as pageActions from "../../../../actions/pageActions";
import Navigation from "../../../UIComponents/Navigation";

class Header extends Component {
    render() {
        const {
            navigation, isSessionActive, user, headerSearchSelector, headerContentNavigation, headerOtherSelector,
        } = this.props;
        return (
            <header className="header">
                <div className="container content">
                    <div className="grid grid-full">
                        <div className="grid-cell top-holder-cell">
                            <div className="grid">
                                <div className="grid-cell left-holder-cell">
                                    <div className="left-holder-container">
                                        <div className="grid grid-center logo-holder">
                                            <div className="grid-cell">
                                                <div className="logo-container">
logo                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-cell middle-holder-cell">
                                    <div className="middle-holder-container">
                                        {isSessionActive && user.session.authorized ? navigation : null}
                                    </div>
                                </div>
                                <div className="grid-cell right-holder-cell" style={{ backgroundColor: "#242536" }}>
                                    <HeaderRightNavigation />
                                </div>
                            </div>
                        </div>
                        <div className="grid-cell center-holder-cell">
                            <div className="grid grid-center">
                                <div className="grid-cell left-holder-cell">
                                    <div className="left-holder-container">

                                    </div>
                                </div>
                                {
                                    isSessionActive && user.session.authorized
                                        ? (
                                            <div className="grid-cell middle-holder-cell">
                                                <div className="middle-holder-container">
                                                    <div className="content-container">
                                                        {
                                                            headerSearchSelector
                                                                ? <div className="header-search-selector-container">{headerSearchSelector}</div> : null
                                                        }
                                                        {
                                                            headerContentNavigation
                                                                ? <div className="header-content-navigation">{headerContentNavigation}</div> : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                }
                                <div className="grid-cell right-holder-cell">
                                    <div className="right-holder-container">
                                        <div className="right-other-holder">
                                            {
                                                headerOtherSelector
                                                    ? <div className="header-other-selector-container">{headerOtherSelector}</div> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    // route: PropTypes.any,
    isSessionActive: PropTypes.bool,
    navigation: PropTypes.any,
    headerSearchSelector: PropTypes.any,
    headerContentNavigation: PropTypes.any,
    headerOtherSelector: PropTypes.any,
};
Header.defaultProps = {
    // route: null,
    isSessionActive: false,
    navigation: null,
    headerSearchSelector: null,
    headerContentNavigation: null,
    headerOtherSelector: null,
};
Header.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);