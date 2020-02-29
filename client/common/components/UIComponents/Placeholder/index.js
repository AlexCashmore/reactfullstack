import React, { Component } from "react";
import PropTypes from "prop-types";

class Placeholder extends Component {
    static defaultPlaceholder() {
        return (
            <div className="default-loader" />
        );
    }

    static postPlaceholder() {
        return (
            <div className="post-loader">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        );
    }

    get getPlaceholder() {
        const { type } = this.props;
        switch (type) {
        case "post":
            return Placeholder.postPlaceholder();
        default:
            return Placeholder.defaultPlaceholder();
        }
    }

    render() {
        const { containerClass, className } = this.props;
        const htmlContainerProps = {
            className: containerClass,
        };
        const htmlPlaceholderProps = {
            className: `placeholder${className ? ` ${className}` : ""}`,
        };
        const innerPlaceholder = this.getPlaceholder;
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

Placeholder.propTypes = {
    containerClass: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
};
Placeholder.defaultProps = {
    containerClass: "",
    className: "",
    type: "default",
};
Placeholder.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Placeholder;