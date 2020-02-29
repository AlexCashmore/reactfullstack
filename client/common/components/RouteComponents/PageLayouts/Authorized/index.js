import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Login from "../../PageComponents/Login";
import Spinner from "../../../UIComponents/Spinner";

class Authorized extends PureComponent {
    render() {
        const {
            innerContainer, isSessionActive, user, settings,
        } = this.props;
        return (
            <section className="content holygrail-body-container">
                <div className="holygrail-content-container">
                    {
                        !isSessionActive || user.session.fetching || user.account.fetching || user.info.fetching
                            ? (
                                <Login
                                    fetching={user.session.fetching}
                                    isSessionActive={isSessionActive}
                                />
                            )
                            : (
                                <section className="authorized">
                                    {settings.selectedOrganizationId ? innerContainer : <Spinner label="Loading application..." />}
                                </section>
                            )
                    }
                </div>
            </section>
        );
    }
}

Authorized.propTypes = {
    isSessionActive: PropTypes.bool,
    innerContainer: PropTypes.any,
};
Authorized.defaultProps = {
    isSessionActive: false,
    innerContainer: null,
};
Authorized.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        settings: state.settings,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({});
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorized);