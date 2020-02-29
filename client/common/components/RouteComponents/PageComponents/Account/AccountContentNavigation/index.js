import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import HeaderContentNavigation from "../../../SharedComponents/Header/HeaderContentNavigation";

class AccountContentNavigation extends PureComponent {
    render() {
        return (
            <HeaderContentNavigation
                className="account-content-navigation"
                items={[
                    {
                        className: "grid-cell-autoSize",
                        link: "/account/settings",
                        title: "Account Settings",
                        name: "Account Settings",
                    },
                ]}
            />
        );
    }
}

AccountContentNavigation.propTypes = {};
AccountContentNavigation.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default AccountContentNavigation;