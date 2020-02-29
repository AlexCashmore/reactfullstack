import React, { Component } from "react";
import PropTypes from "prop-types";

class InputElement extends Component {
    get className() {
        const { className } = this.props;
        return `input-control${className ? ` ${className}` : ""}`;
    }

    get handleInputChange() {
        const { onChange } = this.props;
        return (event) => {
            if(typeof onChange === "function") {
                onChange(event.target.value, event);
            }
        };
    }

    get handleInputBlur() {
        const { onBlur } = this.props;
        return (event) => {
            if(typeof onBlur === "function") {
                onBlur(event.target.value, event);
            }
        };
    }

    render() {
        const {
            id, name, type, placeholder, value, disabled,
        } = this.props;
        const htmlAttributes = {
            className: this.className,
            id,
            name,
            type,
            placeholder,
            value: `${value}`,
            onChange: this.handleInputChange,
            onBlur: this.handleInputBlur,
        };
        if(disabled) {
            htmlAttributes.disabled = "disabled";
        }
        return (
            <input {...htmlAttributes} />
        );
    }
}

InputElement.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};
InputElement.defaultProps = {
    id: undefined,
    name: undefined,
    className: undefined,
    placeholder: undefined,
    value: "",
    type: "text",
    disabled: false,
    onChange: null,
    onBlur: null,
};
InputElement.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default InputElement;