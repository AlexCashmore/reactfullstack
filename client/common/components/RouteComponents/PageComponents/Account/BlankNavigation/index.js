import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import HeaderContentNavigation from "../../../SharedComponents/Header/HeaderContentNavigation";

class BlankNavigation extends PureComponent {
    render() {
        return (
            <HeaderContentNavigation
                className="account-content-navigation"
                items={[
                ]}
            />
        );
    }
}

BlankNavigation.propTypes = {};
BlankNavigation.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default BlankNavigation;