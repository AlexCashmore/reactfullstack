import React, { Component } from "react";
import PropTypes from "prop-types";

class Tooltip extends Component {
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

    get contentOpen() {
        return () => {
            this.setState({
                visible: true,
            });
        };
    }

    get contentClose() {
        return () => {
            this.setState({
                visible: false,
            });
        };
    }

    get contentToggle() {
        return () => {
            this.setState({
                visible: !this.isVisible,
            });
        };
    }

    get className() {
        const { className, align, wordWrap } = this.props;
        return `tooltip${className ? ` ${className}` : ""}${this.isVisible ? " open" : ""}${align ? ` tooltip-${align}` : ""}${wordWrap ? " tooltip-wordWrap" : ""}`;
    }

    get iconClassName() {
        const { fontClass, fontClassIcon } = this.props;
        return (`${fontClass} ${fontClassIcon}`).trim();
    }

    render() {
        const { children } = this.props;
        return (
            <div className={this.className}>
                <i onMouseEnter={this.contentOpen} onMouseLeave={this.contentClose} onClick={this.contentToggle} className={this.iconClassName} />
                <div className="tooltip-content tooltip-arrow-top">{children || "No information available."}</div>
            </div>
        );
    }
}

Tooltip.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    align: PropTypes.string,
    fontClass: PropTypes.string,
    fontClassIcon: PropTypes.string,
    wordWrap: PropTypes.bool,
};
Tooltip.defaultProps = {
    className: "",
    visible: false,
    align: "center",
    fontClass: "fa",
    fontClassIcon: "fa-question",
    wordWrap: false,
};
Tooltip.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Tooltip;