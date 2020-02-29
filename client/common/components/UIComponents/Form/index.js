import React, { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
    get className() {
        const { className } = this.props;
        return `form-container${className ? ` ${className}` : ""}`;
    }

    get handleFormSubmit() {
        return (event) => {
            const { onSubmit } = this.props;
            if(event.which === 13 || event.key === 13) {
                event.stopPropagation();
                event.preventDefault();

                if(typeof onSubmit === "function") {
                    onSubmit(event);
                }
            }
        };
    }

    render() {
        const { name, children } = this.props;
        const formHTMLProps = {
            className: this.className,
            name,
        };

        return (
            <form {...formHTMLProps} onKeyDown={this.handleFormSubmit}>
                {children}
            </form>
        );
    }
}

Form.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onSubmit: PropTypes.func,
};
Form.defaultProps = {
    className: "",
    name: "",
    onSubmit: null,
};
Form.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Form;