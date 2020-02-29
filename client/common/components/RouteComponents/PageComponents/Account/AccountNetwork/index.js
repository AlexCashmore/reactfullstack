import React, { Component } from "react";
import PropTypes from "prop-types";

import { ResizeSensor } from "@blueprintjs/core";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NetworkManager from "./NetworkManager";

import * as pageActions from "../../../../../actions/pageActions";

class AccountNetwork extends Component {
    componentWillMount() {
        this.setState({
            width: 0,
            height: 0,
        });
    }

    handleResize() {
        return (entries) => {
            if(entries[0]) {
                const {
                    width, height, left, top, x, y,
                } = entries[0].contentRect;
                this.setState({
                    width: width + left + x,
                    height: height + top + y,
                });
            }
        };
    }

    render() {
        const { width, height } = this.state;
        return (
            <ResizeSensor onResize={this.handleResize()}>
                <section className="account-network content container">
                    <NetworkManager width={width} height={height} />
                </section>
            </ResizeSensor>
        );
    }
}

AccountNetwork.propTypes = {};
AccountNetwork.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountNetwork);