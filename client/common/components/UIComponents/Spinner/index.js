import React, { Component } from "react";
import PropTypes from "prop-types";

class Spinner extends Component {
    get getSpinner() {
        const { label } = this.props;
        return (
            <div className="spinner-content">
                <div className="spin" />
                {label ? <div className="spinner-label">{label}</div> : null}
            </div>
        );
    }

    render() {
        const { containerClass, className, size } = this.props;
        const htmlContainerProps = {
            className: containerClass,
        };
        const htmlPlaceholderProps = {
            className: `spinner spinner-${size} spinner-is-spinning${className ? ` ${className}` : ""}`,
        };
        const innerPlaceholder = this.getSpinner;
        let componentRender = (
            <div {...htmlPlaceholderProps}>
                {innerPlaceholder}
            </div>
        );
        if(containerClass) {
            componentRender = (
                <div {...htmlContainerProps}>
                    {componentRender}
                </div>
            );
        }
        return (componentRender);
    }
}

Spinner.propTypes = {
    containerClass: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    label: PropTypes.string,
};
Spinner.defaultProps = {
    containerClass: "",
    className: "",
    label: "",
    size: "large",
};
Spinner.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Spinner;