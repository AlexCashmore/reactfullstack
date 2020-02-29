import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as pageActions from "../../../../actions/pageActions";

class SmartComponent extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                SmartComponent
            </div>
        );
    }
}

SmartComponent.propTypes = {};
SmartComponent.defaultProps = {};
SmartComponent.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SmartComponent);