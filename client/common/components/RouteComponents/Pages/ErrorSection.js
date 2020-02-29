import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Link from "../../UIComponents/Link";

import * as pageActions from "../../../actions/pageActions";

class ErrorSection extends Component {
    componentDidMount() {
        const { lang, loadPage } = this.props;
        loadPage(lang.langCode, "*");
    }

    render() {
        const { errorMessage, errorCode } = this.props;

        return (
            <main className="main-page-error">
                <div className="container">
                    <div className="title">
                        <span>{errorMessage}</span>
                        <div className="error-code">
                            (
                            {errorCode}
                            {" "}
                            error)
                        </div>
                    </div>
                    <div className="text">
                        {"This is somewhat embarrassing, isn't it?"}
                        <br />
                        {"Looks like you were looking for something we couldn't find for you..."}
                    </div>
                    <Link href="/" className="error-link" link="/">Go back to homepage</Link>
                </div>
            </main>
        );
    }
}

ErrorSection.propTypes = {
    errorMessage: PropTypes.string,
    errorCode: PropTypes.number,
};
ErrorSection.defaultProps = {
    errorMessage: "Page not found",
    errorCode: 404,
};
ErrorSection.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSection);