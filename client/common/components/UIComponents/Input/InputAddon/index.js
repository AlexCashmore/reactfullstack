import React, { Component } from "react";
import PropTypes from "prop-types";

class InputAddon extends Component {
    get className() {
        const { className } = this.props;
        return `input-control-addon default${className ? ` ${className}` : ""}`;
    }

    render() {
        const { children } = this.props;
        return (
            <div className={this.className}>{children}</div>
        );
    }
}

InputAddon.propTypes = {
    className: PropTypes.string,
};
InputAddon.defaultProps = {
    className: "",
};
InputAddon.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default InputAddon;