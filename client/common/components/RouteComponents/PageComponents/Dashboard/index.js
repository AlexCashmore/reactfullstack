/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { DateTime } from "luxon";
import LineGraph from "../LineGraph";

import * as pageActions from "../../../../actions/pageActions";
import * as organizationActions from "../../../../actions/organizationActions";

class Dashboard extends Component {
    componentWillMount() {
        this.setState({
            inputSearchValue: "",
            currentTime: new Date(),
            isModalStatus: false,
        });
    }

    componentDidMount() {
        const {
            loadPage, lang, location, fetchRouteStatistics,
        } = this.props;
        loadPage(lang.langCode, location.pathname);
        const start = DateTime.utc().setZone(this.renderTimezoneOffset(this.props.timezoneOffset)).startOf("day").toUTC()
            .toISO();
        const end = DateTime.utc().setZone(this.renderTimezoneOffset(this.props.timezoneOffset)).endOf("day").toUTC()
            .toISO();
        // fetch something for dashboard
    }

    renderTimezoneOffset(offset) {
        const parsedTimezone = parseInt(offset, 10);
        if(isNaN(parsedTimezone) || (typeof parsedTimezone === "number" && parsedTimezone === 0)) {
            return "UTC";
        }
        if(parsedTimezone > 0) {
            return `UTC+${parsedTimezone}`;
        }

        return `UTC${parsedTimezone}`;
    }

    render() {
        return (
            <section className="dashboard content container">
                <div className="wrapper">
                    <LineGraph />
                </div>
            </section>
        );
    }

    // return (<Spinner label="Loading Dashboard..." />);
}

Dashboard.propTypes = {};
Dashboard.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        organization: state.organization.organization,
        route: state.route,
        analytics: state.analytics,
        day: state.page,
        user: state.user,
        settings: state.settings,
        network: state.network,
        timezoneOffset: state.user.info.timezoneOffset,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, organizationActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);