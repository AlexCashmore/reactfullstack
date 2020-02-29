import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as pageActions from "../../../../../../actions/pageActions";

class SampleModalContent extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <div className="modal-sample-content">
                <div className="grid grid-full grid-gutters">
                    <div className="grid-cell">Sample modal</div>
                </div>
            </div>
        );
    }
}

SampleModalContent.propTypes = {};
SampleModalContent.defaultProps = {};
SampleModalContent.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SampleModalContent);