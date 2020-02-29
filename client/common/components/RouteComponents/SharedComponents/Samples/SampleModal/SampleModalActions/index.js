import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as pageActions from "../../../../../../actions/pageActions";

class SampleModalActions extends Component {
    get cancelFunction() {
        return (event) => {
            const { cancelFunction } = this.props;
            if(typeof cancelFunction !== "function") {
                return false;
            }
            return cancelFunction(event);
        };
    }

    render() {
        return (
            <div className="modal-sample-actions">
                <div className="grid grid-right grid-gutters">
                    <div className="grid-cell grid-cell-autoSize">
                        <div role="button" className="btn btn-custom btn-asset-cancel" onClick={this.cancelFunction}>Cancel</div>
                    </div>
                    <div className="grid-cell grid-cell-autoSize">
                        <div className="btn btn-custom btn-custom-green btn-custom-full btn-asset-add">Save</div>
                    </div>
                </div>
            </div>
        );
    }
}

SampleModalActions.propTypes = {
    cancelFunction: PropTypes.any,
};
SampleModalActions.defaultProps = {
    cancelFunction: null,
};
SampleModalActions.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SampleModalActions);