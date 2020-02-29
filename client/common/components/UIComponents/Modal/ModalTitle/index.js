import React, { Component } from "react";
import PropTypes from "prop-types";

class ModalTitle extends Component {
    get closeFunction() {
        return (event) => {
            const { closeFunction } = this.props;
            if(typeof closeFunction !== "function") {
                return false;
            }
            return closeFunction(event);
        };
    }

    render() {
        const { title } = this.props;
        return (
            <div className="modal-header-container">
                <div className="modal-title">{title}</div>
                <div className="modal-close" onClick={this.closeFunction}><i className="fa fa-times" /></div>
            </div>
        );
    }
}

ModalTitle.propTypes = {
    title: PropTypes.string,
    closeFunction: PropTypes.any,
};
ModalTitle.defaultProps = {
    title: "",
    closeFunction: null,
};
ModalTitle.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default ModalTitle;