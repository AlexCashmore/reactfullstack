import React, { Component } from "react";
import PropTypes from "prop-types";

import {
    InputGroup, Classes,
} from "@blueprintjs/core";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as pageActions from "../../../../../actions/pageActions";

class HeaderSearchSelector extends Component {
    componentWillMount() {
        this.setState({
            inputSearchValue: "",
        });
    }

    get handleSearchChange() {
        return (e) => {
            this.setState({
                inputSearchValue: e.target.value,
            });
        };
    }

    render() {
        const { inputSearchValue } = this.state;
        return (
            <div className="header-search-selector">
                <div className="grid grid-center">
                    <div className="grid-cell">
                      {/*  <InputGroup
                            className={`${Classes.FILL}`}
                            leftIcon="search"
                            onChange={this.handleSearchChange}
                            placeholder="Search"
                            value={inputSearchValue}
                        />*/}
                    </div>
                </div>
            </div>
        );
    }
}

HeaderSearchSelector.propTypes = {};
HeaderSearchSelector.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchSelector);