import React, { Component } from "react";
import PropTypes from "prop-types";

class ModalActions extends Component {
    // get cancelFunction() {
    //     return (event) => {
    //         const { cancelFunction } = this.props;
    //         if(typeof cancelFunction !== "function") {
    //             return false;
    //         }
    //         return cancelFunction(event);
    //     };
    // }

    render() {
        const { children } = this.props;
        return (
            <div className="modal-actions">
                {children}
            </div>
        );
    }
}

ModalActions.propTypes = {
    // cancelFunction: PropTypes.any,
};
ModalActions.defaultProps = {
    // cancelFunction: null,
};
ModalActions.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default ModalActions;