import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Navigation extends PureComponent {
    render() {
        const { containerClass, className, children } = this.props;
        let componentRender = (
            <ul className={className}>
                {children}
            </ul>
        );
        if(containerClass) {
            componentRender = (
                <section className={containerClass}>
                    {componentRender}
                </section>
            );
        }
        return (componentRender);
    }
}

Navigation.propTypes = {
    containerClass: PropTypes.string,
    className: PropTypes.string,
};

Navigation.defaultProps = {
    containerClass: "",
    className: "",
};
Navigation.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Navigation;