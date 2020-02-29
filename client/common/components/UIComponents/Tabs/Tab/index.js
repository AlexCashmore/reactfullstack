import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
    render() {
        const { children } = this.props;
        return (
            <section>{children}</section>
        );
    }
}

Tab.propTypes = {};
Tab.defaultProps = {};
Tab.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Tab;