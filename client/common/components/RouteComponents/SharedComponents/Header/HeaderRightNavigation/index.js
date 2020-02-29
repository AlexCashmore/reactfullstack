import React, { Component } from "react";
import PropTypes from "prop-types";

import Moment from "react-moment";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import Navigation from "../../../../UIComponents/Navigation";
import * as pageActions from "../../../../../actions/pageActions";
import * as userActions from "../../../../../actions/userActions";

class HeaderRightNavigation extends Component {
    componentWillMount() {
        this.setState({
            currentTime: null,
        });
    }

    componentDidMount() {
        this.updateCurrentTime();

        this.interval = setInterval(
            () => this.updateCurrentTime(),
            5000, // if required change it to lower
        );
    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }

    updateCurrentTime() {
        this.setState({
            currentTime: new Date(),
        });
    }
    // todo account link here
    /* _.find(moment.tz.names(), (timezoneName) => {
    return timezoneOffset === moment.tz(timezoneName).format('Z');
});*/

    render() {
        const { currentTime } = this.state;
        return (
            <nav role="navigation" className="header-right-navigation">
                <Navigation className="grid grid-fit" style={{ maxWidth: 140 }}>
                    <li className="grid-cell" style={{ maxWidth: 140 }}>
                        <div className="current-time">
                            {currentTime ? (
                                <div title={this.props.user.info.timezoneOffset}>
    {moment(currentTime).utcOffset(12).format("MMM Do, hh:mm A")}
    <br />
                                    <div style={{ fontSize: 9 }}>{this.props.user.info.timezone}</div>
                                </div>
                            ) : null}
                        </div>
                    </li>
                    <div
                        style={{
                            maxWidth: 120,
                            borderRight: "1px solid #000639",
                            color: "white",
                            cursor: "pointer",
                        }}
                        className="grid-cell"
                    >
                        {this.props.user.info.fetched && this.props.user.session.authorized
                        && (
                            <div
                            style={{ paddingRight: 10 }}
                            onClick={() => {
                                    this.context.router.replace("/account");
                                }}
                        >
                            <div style={{ paddingRight: 3 }} className="fa fa-user icon" />
                                {this.props.user.info.fetched && this.props.user.session.authorized
                            && <span style={{fontSize:12}}>{
                                this.props.user.account.nickname||
                                this.props.user.session.account.username
                            }</span>}
                        </div>
                        )
                        }
                    </div>

                    {(this.props.user.info.fetched && this.props.user.session.authorized)
                        ? (
                            <div
                                style={{
                                    maxWidth: 120,
                                    color: "white",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    this.props.logout(this.props.user.session.account.userId, this.props.user.session.account.token);
                                    return setTimeout(()=>{ window.location.reload();
                                    },200);
                                }}
                                className="grid-cell"
                            >
                                {" "}
                                <div>
                                    <div style={{ paddingRight: 5 }} className="fa fa-sign-out-alt icon" />
                                Log Out
                                    {" "}
                                </div>
                            </div>
                        )
                        : <div style={{ maxWidth: 120 }} className="grid-cell" />
                    }

                </Navigation>
            </nav>
        );
    }
}

HeaderRightNavigation.propTypes = {};
HeaderRightNavigation.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, userActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightNavigation);