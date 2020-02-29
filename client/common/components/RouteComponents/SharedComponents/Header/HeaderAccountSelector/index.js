import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Link from "../../../../UIComponents/Link";

import * as pageActions from "../../../../../actions/pageActions";

class HeaderAccountSelector extends PureComponent {
    render() {
        return (
            <Link href="/account" link="/account" className="header-account-selector u-userSelectDisable">
                <div className="grid grid-fit grid-center">
                    <div className="grid-cell grid-cell-center-both">
                        <div className="profile-image">
                            <img alt="avatar" src="http://via.placeholder.com/28x28" width={28} height={28} />
                        </div>
                    </div>
                    <div className="grid-cell grid-cell-center-both">
                        <div className="profile-name">Username</div>
                    </div>
                    <div className="grid-cell grid-cell-center-both">
                        <div className="selector-icon">
                            <div className="fa fa-caret-up icon" />
                            <div className="fa fa-caret-down icon" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

HeaderAccountSelector.propTypes = {};
HeaderAccountSelector.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAccountSelector);