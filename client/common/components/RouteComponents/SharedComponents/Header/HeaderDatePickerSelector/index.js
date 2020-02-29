import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import * as pageActions from "../../../../../actions/pageActions";
import Input from "../../../../UIComponents/Input";
import { renderTimezoneOffset } from "../../../../../entities/constants";
import grey from "@material-ui/core/colors/grey";

class HeaderDatePickerOtherSelector extends Component {
    componentWillMount() {
        const dates = [DateTime.utc().toISO(), DateTime.utc().toISO()];
        const overrideZoneStart = DateTime.fromISO(dates[0]).setZone(renderTimezoneOffset(this.props.timezoneOffset));
        this.setState({
            inputDateValue: this.props.timezoneOffset ? overrideZoneStart : null,
            allRoutes: false,
            inputDateValueRaw: dates[0],
        });
        this.props.updateDay(dates[0]);
    }

    componentDidMount() {
        const overrideZoneStart = DateTime.fromISO(new Date().toISOString()).toUTC().setZone(renderTimezoneOffset(this.props.timezoneOffset));
        const overrideZoneEnd = DateTime.fromISO(new Date().toISOString()).toUTC().setZone(renderTimezoneOffset(this.props.timezoneOffset));
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

    get handleTimePeriodChange() {
        const {
            fetchRoutes, removeProductFromRoute, settings, user,
        } = this.props;
        return (value) => {
            const dateSwitch = value.setZone(this.renderTimezoneOffset(this.props.timezoneOffset)).toUTC().toISO();

            const date = value.setZone(this.renderTimezoneOffset(this.props.timezoneOffset)).toUTC().toISO();
            const dateStart = value.setZone(this.renderTimezoneOffset(this.props.timezoneOffset)).startOf('day').toUTC().toISO();
            const dateEnd = value.setZone(this.renderTimezoneOffset(this.props.timezoneOffset)).endOf('day').toUTC().toISO();
            this.props.updateDay(dateSwitch);
            this.props.updateDate([dateSwitch, dateSwitch]);
            this.props.dashboardRedirect(true);
            const overrideZoneStart = DateTime.fromISO(dateSwitch)
                .setZone(this.renderTimezoneOffset(this.props.timezoneOffset))
                .startOf("day")
                .toUTC()
                .toISO();

            const overrideZoneEnd = DateTime.fromISO(overrideZoneStart).plus({ hours: 24 }).toUTC().toISO();
            this.setState({
                inputDateValue: value,
            });
        };
    }

    render() {
        const materialTheme = createMuiTheme({
            overrides: {
                MuiFormControl: {
                    root: {
                        width: 150,
                    },
                },
                MuiOutlinedInput: {
                    adornedStart: {
                        paddingLeft: 0,
                    },
                    input: {
                        padding: 2,
                    },
                },
                MuiPickersClock: {
                    pin: {
                        backgroundColor: grey["400"],
                    },
                },
                MuiPickersClockPointer: {
                    pointer: {
                        backgroundColor: grey["400"],
                    },
                    thumb: {
                        backgroundColor: grey["400"],
                        border: "14px solid #1d85e1",
                    },
                },

                MuiPickersClockNumber: {
                    clockNumberSelected: {
                        backgroundColor: grey["400"],
                    },
                },
                PrivateTabIndicator:{
                    root:{width:160},
                    colorSecondary:'#1d85e1',
                },
                MuiTabsIndicator:{
                    width:160
                },
                MuiTab: {
                    wrapper: { backgroundColor: grey["400"] },
                    fullWidth: { backgroundColor: grey["400"] },

                },
                MuiButton: {
                    label: {
                        color: "black",
                    },
                },
                MuiFocused:{
                    borderBottomColor: '#1d85e1',
                    '&:hover':{
                        borderBottomColor: '#1d85e1',
                    },
                    '&:hover:and($focused)': {
                        borderBottomColor: '#1d85e1',
                    },
                },
                MuiInput: {
                    underline: {
                        '&:hover:not($disabled):not($focused):not($error):before': {
                            borderBottom: `1.5px solid #1d85e1`,
                            borderRadius:4

                        },

                        disableUnderline: true,
                        "&:before":{
                            borderBottom:'1px solid #1d85e1',
                            borderRadius:4
                        },
                        "&:after": {
                            borderBottom: '1px solid #1d85e1',
                            borderRadius:4

                        },
                        "&$focused": {
                            borderBottom: "0.25px solid #1d85e1",
                            borderRadius:4

                        },
                        '&:hover:not($disabled):not($error):before': {
                            borderBottomColor: '#1d85e1',
                        },
                        '&:hover:and($focused)': {
                            borderBottomColor: '#1d85e1',
                        },
                        '&:hover:after': {
                            borderBottomColor: '#1d85e1',
                        },
                        '&:hover:before': {
                            borderBottomColor: '#1d85e1',
                        },
                        '&:hover': {
                            borderBottomColor: '#1d85e1',
                        },

                    },

                    input: {
                        borderBottom: "none",
                        backgroundColor: 'white',
                        border: '1px solid #1d85e1',
                        borderRadius: 4,
                        paddingLeft: 4,
                        fontWeight: 500,
                        color: '#637381',
                    },
                },

                MuiPickersToolbar: {
                    toolbar: {
                        backgroundColor: grey['400'],
                    },
                },
                MuiPickersDay: {
                    daySelected: {
                        backgroundColor: grey["400"],
                    },
                    dayDisabled: {
                        color: grey["100"],
                    },
                    current: {
                        color: grey.A900,
                    },
                },
            },
        });
        const fallbackDate = DateTime.fromISO(this.state.inputDateValueRaw).setZone(this.renderTimezoneOffset(this.props.timezoneOffset));
        return (
            <div className="header-date-picker-selector u-userSelectDisable">
                {this.props.user.info.fetched && this.props.user.session.authorized && (
                    <div className="grid grid-full grid-center">
                        <div className="grid-cell">
                            <Input
                                className="input-filter-time-period-route"
                            >
                                <MuiPickersUtilsProvider utils={LuxonUtils}>
                                    <ThemeProvider theme={materialTheme}>
                                        <DatePicker format="EEE, DD" value={this.state.inputDateValue || fallbackDate} onChange={this.handleTimePeriodChange} variant="inline" />

                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </Input>
                        </div>

                    </div>
                )
                }
            </div>
        );
    }
}

HeaderDatePickerOtherSelector.propTypes = {};
HeaderDatePickerOtherSelector.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        user: state.user,
        timezone: state.user.info.timezone,
        timezoneOffset: state.user.info.timezoneOffset,
        settings: state.settings,
        day: state.page.day,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDatePickerOtherSelector);