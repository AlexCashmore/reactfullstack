import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as pageActions from "../../../../actions/pageActions";
import * as userActions from "../../../../actions/userActions";

class Login extends Component {
    componentWillMount() {
        this.setState({
            error: false,
            loadingLoginView: true,
        });
    }

    componentDidMount() {
        this.setState({
            loadingLoginView: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { user } = this.props;
        if(nextProps.user.session.fetching !== user.session.fetching) {
            this.setState({
                error: nextProps.user.session.error,
            });
        }
    }

    render() {
        const { loadingLoginView, error } = this.state;

        return !loadingLoginView ? (
            <section className="authorizing">
                <div className="grid grid-full grid-center authorizing-inputs-holder">
                    <div className="grid-cell grid-cell-autoSize">
                        <div className="authorizing-inputs">
                            <div className="panel">
                                <div className="panel-header-container">Authorizing</div>
                                <div className="panel-content-container">
                                    {error || "Verifying credentials..."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ) : null;
    }
}

Login.propTypes = {
    fetching: PropTypes.bool.isRequired,
};
Login.defaultProps = {};
Login.contextTypes = {
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
    const actions = Object.assign({}, pageActions, userActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);