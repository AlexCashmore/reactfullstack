import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Button, InputGroup, MenuItem, Position, Radio, RadioGroup,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { TimezonePicker } from "@blueprintjs/timezone";
import moment from "moment";
import { TimezoneDisplayFormat } from "@blueprintjs/timezone/lib/cjs/components/timezone-picker/timezoneDisplayFormat";
import Search from "../../../SharedComponents/Entities/Search";

import Input from "../../../../UIComponents/Input";
import Link from "../../../../UIComponents/Link";

import * as pageActions from "../../../../../actions/pageActions";
import * as userActions from "../../../../../actions/userActions";
/*The account settings page will let the user update their settings such as Temperature Unit, Timezone, Country and Display Name*/
class AccountSettings extends Component {
    componentWillMount() {
        // todo fill in user details
        this.setState({
            inputNicknameValue: this.props.user.info.nickname,
            inputFirstNameValue: this.props.user.info.firstName,
            inputLastNameValue: this.props.user.info.lastName,
            inputAddress1Value: this.props.user.info.address1,
            inputAddress2Value: this.props.user.info.address2,
            inputCityValue: this.props.user.info.city,
            inputEmailValue: this.props.user.info.email,
            inputRegionValue: this.props.user.info.region,
            inputZipValue: this.props.user.info.zip,
            inputTimeZoneValue: this.props.user.info.timezone,
            timezoneOffset: null,
            errors: { nickname: this.props.user.info.nickname ? this.props.user.info.nickname.length > 16 : false },
            inputCountryValue: {
                title: "Select a Country",
                value: "all",
            },
            inputTemperatureUnit: { title: this.props.user.info.temperatureUnit || "Celsius", value: this.props.user.info.temperatureUnit || "celsius" },
        });
    }

    componentDidMount() {
        const { loadPage, lang, location } = this.props;
        this.props.changeTitle("Account Settings");
    }

    handleUserInfoSubmit(values) {
        if(values.inputNicknameValue.length <= 16) {
            const valuesInput = {
                timezone: values.inputTimeZoneValue,
                firstName: values.inputFirstNameValue,
                lastName: values.inputLastNameValue,
                phone: values.inputMobileValue,
                email: values.inputEmailValue,
                temperatureUnit: values.inputTemperatureUnit.value,
                region: values.inputRegionValue,
                nickname: values.inputNicknameValue,
                // timezoneOffset:values.timezoneOffset,
            };
            this.props.updateUserAccountInfo(this.props.user.session.account.userId, this.props.user.session.account.token, valuesInput);
            setTimeout(() => {
                this.context.router.replace("/");
                window.location.reload();
            }, 500);
        } else {
            const errorSet = this.state.errors;
            errorSet.nickname = true;
            this.setState({
                errors: errorSet,
            });
        }
    }

    /*Handle changing the timezone by using the moment library and applying it to a new moment object*/
    get handleTimeZoneChange() {
        return (value) => {
            const tz = moment({}).tz(value).format("Z");
            this.setState({
                inputTimeZoneValue: value,
                timezoneOffset: tz,
            });
        };
    }

    get handleFirstNameChange() {
        return (e) => {
            this.setState({
                inputFirstNameValue: e.target.value,
            });
        };
    }

    get handleNicknameChange() {
        return (e) => {
            const errorSet = this.state.errors;
            errorSet.nickname = e.target.value.length > 16;
            this.setState({
                inputNicknameValue: e.target.value,
                errors: errorSet,
            });
        };
    }

    get handleLastNameChange() {
        return (e) => {
            this.setState({
                inputLastNameValue: e.target.value,
            });
        };
    }

    get handleMobileChange() {
        return (e) => {
            this.setState({
                inputMobileValue: e.target.value,
            });
        };
    }

    get handleAddress2Change() {
        return (e) => {
            this.setState({
                inputAddress2Value: e.target.value,
            });
        };
    }

    get handleCityChange() {
        return (e) => {
            this.setState({
                inputCityValue: e.target.value,
            });
        };
    }

    get handleEmailChange() {
        return (e) => {
            this.setState({
                inputEmailValue: e.target.value,
            });
        };
    }

    get handleRegionChange() {
        return (e) => {
            this.setState({
                inputRegionValue: e.target.value,
            });
        };
    }

    get handleZipChange() {
        return (e) => {
            this.setState({
                inputZipValue: e.target.value,
            });
        };
    }

    get handleCountrySearchChange() {
        return (value) => {
            this.setState({
                inputCountryValue: value,
            });
        };
    }

    get handleUnitChange() {
        return (value) => {
            this.setState({
                inputTemperatureUnit: { title: value.target.value, value: value.target.value },
            });
        };
    }

    static renderUser() {
        return (temp, { handleClick, modifiers, query }) => {
            if(!modifiers.matchesPredicate) {
                return null;
            }
            return (
                <MenuItem
                    active={false}
                    key={temp.value}
                    onClick={handleClick}
                    text={Search.highlightText(temp.title, query)}
                />
            );
        };
    }

    renderTimeZone(utc) {
        if(utc > 0) {
            return (`UTC +${utc}:00`);
        }
        if(utc < 0) {
            return (`UTC ${utc}:00`);
        }
        if(utc === 0) {
            return ("UTC 0:00");
        }
    }

    render() {
        const capitalizeText = word => word.charAt(0)
            .toUpperCase() + word.slice(1);
        const userList = {
            items: [
                {
                    title: "Select Country",
                    value: "all",
                },
                {
                    title: "United States",
                    value: "United States",
                },
                {
                    title: "New Zealand",
                    value: "New Zealand",
                },
            ],
            itemPredicate: Search.filterUser,
            itemRenderer: AccountSettings.renderUser(),
        };
        const unitList = {
            items: [
                {
                    title: "Celsius",
                    value: "celsius",
                },
                {
                    title: "Fahrenheit",
                    value: "fahrenheit",
                },
            ],
        };

        const {
            inputFirstNameValue, inputNicknameValue, inputTemperatureUnit, inputLastNameValue, inputMobileValue, inputAddress2Value, inputCityValue, inputEmailValue, inputRegionValue, inputZipValue, inputCountryValue, inputTimeZoneValue,
        } = this.state;

        return (
            <section className="account-settings content container">
                <div className="wrapper">
                    <div className="container">
                        <div className="container">
                            <div className="grid grid-full md-grid-fit grid-top grid-guttersLg">
                                <div className="grid-cell middle-section-holder">
                                    <section className="middle-container">
                                        <div className="grid grid-full grid-top grid-gutters content-holder">
                                            <div className="grid-cell">
                                                <section className="content-section">
                                                    <div className="grid grid-1of2 grid-gutters">
                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="first-name">Display Name:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <InputGroup
                                                                            id="nick-name"
                                                                            maxLength={16}
                                                                            intent={this.state.errors.nickname ? "danger" : ""}
                                                                            onChange={this.handleNicknameChange}
                                                                            placeholder="Please enter your display name"
                                                                            value={inputNicknameValue}
                                                                        />
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell" />
                                                            </div>
                                                        </div>
                                                        <div className="grid-cell" />

                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="first-name">First name:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <InputGroup
                                                                            id="first-name"
                                                                            onChange={this.handleFirstNameChange}
                                                                            placeholder="Please enter your first name"
                                                                            value={inputFirstNameValue}
                                                                        />
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell" />
                                                            </div>
                                                        </div>

                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="last-name">Last name:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <InputGroup
                                                                            id="last-name"
                                                                            className=""
                                                                            onChange={this.handleLastNameChange}
                                                                            placeholder="Please enter your last name"
                                                                            value={inputLastNameValue}
                                                                        />
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell" />
                                                            </div>
                                                        </div>

                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="address-1">Mobile Contact:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <InputGroup
                                                                            id="address-1"
                                                                            className=""
                                                                            onChange={this.handleMobileChange}
                                                                            placeholder="Please enter your Mobile Number"
                                                                            value={inputMobileValue}
                                                                        />
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell" />
                                                            </div>
                                                        </div>

                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="email-address">Email address:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <InputGroup
                                                                            id="email-address"
                                                                            className=""
                                                                            onChange={this.handleEmailChange}
                                                                            placeholder="Please enter your email address"
                                                                            value={inputEmailValue}
                                                                            disabled
                                                                        />
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell" />
                                                            </div>
                                                        </div>

                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="state-region">State/Region:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <InputGroup
                                                                            id="state-region"
                                                                            className=""
                                                                            onChange={this.handleRegionChange}
                                                                            placeholder="Please enter your state or region"
                                                                            value={inputRegionValue}
                                                                        />
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell" />
                                                            </div>
                                                        </div>

                                                        <div className="grid-cell">
                                                            <div className="grid-cell">
                                                                <Input>
                                                                    <label htmlFor="timezone">
                                                                        User Timezone:
                                                                    </label>
                                                                </Input>
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <TimezonePicker
                                                                    buttonProps={{ style: { width: 693 } }}
                                                                    style={{ width: "100%" }}
                                                                    value={this.state.inputTimeZoneValue}
                                                                    onChange={this.handleTimeZoneChange}
                                                                    valueDisplayFormat={TimezoneDisplayFormat.COMPOSITE}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input>
                                                                        <label htmlFor="country">Country:</label>
                                                                    </Input>
                                                                </div>
                                                                <div className="grid-cell">
                                                                    <Input className="input-filter-user-country with-addons with-border-radius">
                                                                        <Select
                                                                            filterable
                                                                            hasInitialContent={false}
                                                                            items={userList.items}
                                                                            itemPredicate={userList.itemPredicate}
                                                                            itemRenderer={userList.itemRenderer}
                                                                            noResults={<MenuItem disabled text="No results." />}
                                                                            onItemSelect={this.handleCountrySearchChange}
                                                                            disabled
                                                                            popoverProps={
                                                                                {
                                                                                    position: Position.BOTTOM,
                                                                                }
                                                                            }
                                                                            inputProps={
                                                                                {
                                                                                    id: "country",
                                                                                    placeholder: "Search for a Country",
                                                                                }
                                                                            }
                                                                        >
                                                                            <Button
                                                                                rightIcon="caret-down"
                                                                                text={inputCountryValue ? `${inputCountryValue.title}` : "No Country selected"}
                                                                                disabled
                                                                            />
                                                                        </Select>
                                                                    </Input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid-cell">
                                                            <div className="grid grid-center grid-full">
                                                                <div className="grid-cell">
                                                                    <Input className="input-filter-user-country with-addons with-border-radius">
                                                                        {/* <Select
                                                                            hasInitialContent={false}
                                                                            items={unitList.items}
                                                                            noResults={<MenuItem disabled text="No results." />}
                                                                            onItemSelect={this.handleUnitChange}
                                                                            itemPredicate={userList.itemPredicate}
                                                                            itemRenderer={userList.itemRenderer}
                                                                            filterable={false}
                                                                            popoverProps={
                                                                                {
                                                                                    position: Position.BOTTOM,
                                                                                }
                                                                            }
                                                                        >
                                                                            <Button
                                                                                rightIcon="caret-down"
                                                                                text={inputTemperatureUnit ? `${capitalizeText(inputTemperatureUnit.title)}` : "No Unit selected"}
                                                                            />
                                                                        </Select>*/}
                                                                        <RadioGroup
                                                                            label="Temperature Unit:"
                                                                            onChange={this.handleUnitChange}
                                                                            selectedValue={inputTemperatureUnit.value}
                                                                            inline
                                                                        >
                                                                            <Radio label="Celsius" value="celsius" />
                                                                            <Radio label="Fahrenheit" value="fahrenheit" />
                                                                        </RadioGroup>
                                                                    </Input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div style={{ color: "red", float: "left" }}>
                                                        {this.state.errors.nickname ? "Username exceeds the character limit of 16 characters." : ""}
                                                    </div>
                                                    <br />
                                                </section>
                                            </div>
                                            <div className="grid-cell">
                                                <section className="content-actions">
                                                    <div className="grid grid-right grid-gutters">
                                                        <div className="grid-cell grid-cell-autoSize">
                                                            <Link link="/organization/permissions" className="btn btn-custom btn-custom-blue btn-custom-full btn-save-user-settings">
                                                                <span>Back</span>
                                                            </Link>
                                                        </div>
                                                        <div className="grid-cell grid-cell-autoSize">
                                                            <div
                                                                onClick={() => {
                                                                    this.handleUserInfoSubmit(this.state);
                                                                }}
                                                                className="btn btn-custom btn-custom-blue btn-custom-full btn-save-user-settings"
                                                            >
                                                                <span>Save settings</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

AccountSettings.propTypes = {};
AccountSettings.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);