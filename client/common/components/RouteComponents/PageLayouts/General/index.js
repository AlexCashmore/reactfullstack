import React, { Component } from "react";
import PropTypes from "prop-types";

import storage from "store";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../../SharedComponents/Header";
import Footer from "../../SharedComponents/Footer";

import * as pageActions from "../../../../actions/pageActions";
import * as userActions from "../../../../actions/userActions";

class General extends Component {
    componentWillMount() {
        this.setState({
            isSessionActive: false,
        });
    }

    componentDidMount() {
        const { verify } = this.props;
        const session = storage.enabled ? storage.get("session") : null;
        if(session) {
            const expiresAt = new Date(session.expiresAt);
            if(expiresAt.getTime() > new Date().getTime()) {
                verify(session.userId, session.token);
            } else {
                storage.remove("session");
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            router,
        } = this.context;
        const {
            userAccount, userAccountInfo, loadPage, lang, location, user,
        } = this.props;
        const isSessionActive = nextProps.user.session.authorized || !!(storage.enabled && storage.get("session"));

        if(!nextProps.user.logout.fetching && !nextProps.user.logout.success && nextProps.user.session.authorized && !nextProps.user.info.fetching && !nextProps.user.info.fetched) {
            const session = storage.enabled ? storage.get("session") : null;
            if(session) {
                userAccount(session.userId, session.token);
                userAccountInfo(session.userId, session.token);
            } else {
                userAccount(nextProps.user.session.account.userId, nextProps.user.session.account.token);
                userAccountInfo(nextProps.user.session.account.userId, nextProps.user.session.account.token);
            }
        }
        if(!user.session.authorized && nextProps.user.session.authorized) {
            router.replace(location.pathname);
            loadPage(lang.langCode, location.pathname);
        }
        this.setState({
            isSessionActive,
        });
    }

    get mainClassName() {
        const { customClass } = this.props;
        return `main fsr holygrail${customClass ? ` ${Object.keys(customClass).filter(key => customClass[key]).join(" ")}` : ""}`;
    }

    render() {
        const {
            isSessionActive,
        } = this.state;
        const {
            headerNavigation, headerSearchSelector, headerOtherSelector, headerContentNavigation, main, innerContainer, footerNavigation,
        } = this.props;
        const propsToShare = {
            isSessionActive,
        };

        const headerNavigationWithProps = headerNavigation ? React.cloneElement(headerNavigation, Object.assign({}, propsToShare)) : null;
        const headerSearchSelectorWithProps = headerSearchSelector ? React.cloneElement(headerSearchSelector, Object.assign({}, propsToShare)) : null;
        const headerOtherSelectorWithProps = headerOtherSelector ? React.cloneElement(headerOtherSelector, Object.assign({}, propsToShare)) : null;
        const headerContentNavigationWithProps = headerContentNavigation ? React.cloneElement(headerContentNavigation, Object.assign({}, propsToShare)) : null;
        const headerWithProps = React.cloneElement(<Header />, Object.assign({}, propsToShare, {
            navigation: headerNavigationWithProps,
            headerSearchSelector: headerSearchSelectorWithProps,
            headerOtherSelector: headerOtherSelectorWithProps,
            headerContentNavigation: headerContentNavigationWithProps,
        }));

        const mainWithProps = React.cloneElement(main, Object.assign({}, propsToShare, { innerContainer }));

        const footerNavigationWithProps = footerNavigation ? React.cloneElement(footerNavigation, Object.assign({}, propsToShare)) : null;
        const footerWithProps = React.cloneElement(<Footer />, Object.assign({}, propsToShare, {
            navigation: footerNavigationWithProps,
        }));

        return (
            <main className={this.mainClassName}>
                {headerWithProps}
                {mainWithProps}
                {footerWithProps}
            </main>
        );
    }
}

General.propTypes = {
    headerNavigation: PropTypes.any,
    main: PropTypes.any,
    footerNavigation: PropTypes.any,
    headerSearchSelector: PropTypes.any,
    headerContentNavigation: PropTypes.any,
};
General.defaultProps = {
    headerNavigation: null,
    main: null,
    footerNavigation: null,
    headerSearchSelector: null,
    headerContentNavigation: null,
};
General.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        customClass: state.page.customClass,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, userActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(General);