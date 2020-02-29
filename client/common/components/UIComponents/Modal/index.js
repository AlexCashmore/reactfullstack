import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
    componentWillUpdate(nextProps) {
        const { visible } = this.props;
        if(visible !== nextProps.visible) {
            this.toggleCallback();
        }
    }

    get activeClass() {
        const { status } = this.props;
        return status ? " active" : "";
    }

    get visibleClass() {
        const { visible } = this.props;
        return visible ? " visible" : "";
    }

    get modalContainerClass() {
        return `modal-container${this.visibleClass}`;
    }

    get openModal() {
        return (event) => {
            const { openModal } = this.props;
            if(typeof openModal !== "function") {
                return false;
            }
            return openModal(event);
        };
    }

    get closeModal() {
        return (event) => {
            const { closeModal } = this.props;
            if(typeof closeModal !== "function") {
                return false;
            }
            return closeModal(event);
        };
    }

    get closeModalOutside() {
        return (event) => {
            const { closeOnBackgroundClick, closeModal } = this.props;
            return closeOnBackgroundClick && event.target.className && event.target.className.indexOf(this.modalContainerClass) !== -1 && typeof closeModal === "function" ? closeModal(event) : false;
        };
    }

    get defaultModal() {
        const { header, children, footer } = this.props;
        return (
            <div className={this.modalContainerClass} onClick={this.closeModalOutside}>
                <div className="modal-content-holder">
                    {
                        header ? (
                            <div className="modal-header">
                                {header}
                            </div>
                        ) : null
                    }
                    <div className="modal-content">
                        {children}
                    </div>
                    {
                        footer ? (
                            <div className="modal-footer">
                                {footer}
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }

    get getModal() {
        const { type } = this.props;
        switch (type) {
        case "default":
            return this.defaultModal;
        default:
            return this.defaultModal;
        }
    }

    toggleCallback() {
        const { toggleCallback } = this.props;
        if(typeof toggleCallback !== "function") {
            return false;
        }
        return toggleCallback();
    }

    render() {
        const { containerClass, className } = this.props;
        const htmlContainerProps = {
            className: containerClass,
        };
        const htmlModalProps = {
            className: `modal modal-theme${this.activeClass}${className ? ` ${className}` : ""}`,
        };
        const innerModal = this.getModal;
        let componentRender = (
            <div {...htmlModalProps}>
                {innerModal}
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

Modal.propTypes = {
    containerClass: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.bool,
    visible: PropTypes.bool,
    closeOnBackgroundClick: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    toggleCallback: PropTypes.func,
    header: PropTypes.any,
    footer: PropTypes.any,
};
Modal.contextTypes = {
    router: PropTypes.object.isRequired,
};
Modal.defaultProps = {
    containerClass: "",
    className: "",
    type: "default",
    status: false,
    visible: false,
    closeOnBackgroundClick: true,
    openModal: null,
    closeModal: null,
    toggleCallback: null,
    header: null,
    footer: null,
};

export default Modal;