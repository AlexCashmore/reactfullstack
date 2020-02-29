import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Link from "../../../UIComponents/Link";
import * as pageActions from "../../../../actions/pageActions";

class Footer extends Component {
    componentDidMount() {
        this.props.getVersion();
    }

    render() {
        const { navigation } = this.props;
        return (
            <footer className="footer">
                <div className="container content">
                    <div className="grid grid-gutters">
                        <div className="grid-cell grid-cell-autoSize">
                        </div>
                        <div className="grid-cell grid-cell-autoSize">
                            { (this.props.version && this.props.version.fetched && !this.props.version.fetching) && <div>{this.props.version.version}</div>}
                        </div>
                        <div className="grid-cell">
                            <div className="footer-text">
                                &copy; Copyright 2019,
                                {" "}
                                Alex C
                            </div>
                        </div>
                        <div className="grid-cell grid-cell-autoSize">
                            {navigation}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    navigation: PropTypes.any,
};
Footer.defaultProps = {
    navigation: null,
};
Footer.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        version: state.page.version,
        user: state.user,
        organization: state.organization.organization,
        settings: state.settings,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);