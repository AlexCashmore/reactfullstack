import React, { Component } from "react";
import PropTypes from "prop-types";

class InputTooltip extends Component {
    componentWillMount() {
        const { visible } = this.props;
        this.setState({
            visible,
        });
    }

    get isVisible() {
        const { visible } = this.state;
        return !!visible;
    }

    get contentToggle() {
        return () => {
            this.setState({
                visible: !this.isVisible,
            });
        };
    }

    get className() {
        const { className, align } = this.props;
        return `input-control-addon input-addon-tooltip${
            this.isVisible ? " open" : ""
        }${className ? ` ${className}` : ""
        }${align ? ` tooltip-${align}` : ""}`;
    }

    get iconClassName() {
        const { fontClass, fontClassIcon } = this.props;
        return (`${fontClass} ${fontClassIcon}`).trim();
    }

    render() {
        const { children } = this.props;
        return (
            <div className={this.className}>
                <i onClick={this.contentToggle} className={this.iconClassName} />
                <div className="tooltip-content">{children}</div>
            </div>
        );
    }
}

InputTooltip.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    align: PropTypes.string,
    fontClass: PropTypes.string,
    fontClassIcon: PropTypes.string,
};
InputTooltip.defaultProps = {
    className: "",
    visible: false,
    align: "left",
    fontClass: "fa",
    fontClassIcon: "fa-question",
};
InputTooltip.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default InputTooltip;