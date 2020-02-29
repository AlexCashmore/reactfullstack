import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
    get className() {
        const { className } = this.props;
        return `input-control-container${className ? ` ${className}` : ""}`;
    }

    render() {
        const { children } = this.props;
        return (
            <div className={this.className}>
                {children}
            </div>
        );
    }
}

Input.propTypes = {
    className: PropTypes.string,
};
Input.defaultProps = {
    className: "",
};
Input.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Input;