import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Button, Intent, InputGroup, Tooltip,
} from "@blueprintjs/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import validate from "../../../../../../utils/customValidate";

import Authorizing from "../../SharedComponents/Authorizing";

import Link from "../../../UIComponents/Link";
import Form from "../../../UIComponents/Form";
import Input from "../../../UIComponents/Input";
import InputAddonTooltip from "../../../UIComponents/Input/InputTooltip";
import InputAddon from "../../../UIComponents/Input/InputAddon";

import * as pageActions from "../../../../actions/pageActions";
import * as userActions from "../../../../actions/userActions";

class Login extends Component {
    componentWillMount() {
        this.setState({
            error: false,
            inputUsernameValue: "",
            inputPasswordValue: "",
            loadingLoginView: true,
            showPassword: false,
        });
    }

    componentDidMount() {
        this.setState({
            loadingLoginView: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { user: nextUser } = nextProps;
        const { session: nextSession } = nextUser;
        const { user } = this.props;
        const { session } = user;
        if(nextSession.fetching !== session.fetching) {
            this.setState({
                error: nextProps.user.session.error,
            });
        }
    }

    get logout() {
        return () => {
            const { logout, user } = this.props;
            const { session } = user;
            logout(session.account.username, session.account.token);
        };
    }

    get handleUsernameChange() {
        return (e) => {
            this.setState({
                inputUsernameValue: e.target.value,
            });
        };
    }

    get handlePasswordChange() {
        return (e) => {
            this.setState({
                inputPasswordValue: e.target.value,
            });
        };
    }

    get handleFormSubmit() {
        return (event) => {
            event.stopPropagation();
            event.preventDefault();

            const { login } = this.props;
            const { inputUsernameValue, inputPasswordValue } = this.state;
            const validationErrors = validate(
                {
                    username: inputUsernameValue,
                    password: inputPasswordValue,
                }, this.constructor.constraints,
            );

            this.setState({
                error: validationErrors,
            });

            if(!validationErrors) {
                login(inputUsernameValue, inputPasswordValue);
            }
        };
    }

    get handleLockClick() {
        return () => {
            const { showPassword } = this.state;
            this.setState({ showPassword: !showPassword });
        };
    }

    render() {
        const { user } = this.props;
        const { session, account, info } = user;
        const {
            error, loadingLoginView, showPassword, inputUsernameValue, inputPasswordValue,
        } = this.state;

        const viewPasswordButton = (
            <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
                <Button
                    icon={showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal
                    onClick={this.handleLockClick}
                />
            </Tooltip>
        );

        const accountIsFetching = session.fetching || account.fetching || info.fetching;

        return !loadingLoginView
            ? accountIsFetching ? <Authorizing fetching={accountIsFetching} />
                : (
                    <section className="login content container">
                        <div className="grid grid-full grid-center login-inputs-holder">
                            <div className="grid-cell grid-cell-autoSize">
                                <div className="login-inputs">

                                    <div className="panel">
                                        <div className="panel-header-container">Customer sign in</div>
                                        <div className="panel-content-container">
                                            <Form onSubmit={this.handleFormSubmit}>
                                                <div className="grid grid-gutters grid-full">

                                                    <div className="grid-cell">

                                                        <div className="grid grid-center grid-full lg-grid-fit">

                                                            <div className="grid-cell input-label-holder">

                                                                <Input>
                                                                    <label htmlFor="login-username-input">Username:</label>
                                                                </Input>

                                                            </div>

                                                            <div className="grid-cell">

                                                                <Input className="username-input with-border-radius with-addons">
                                                                    <InputAddon><i className="fa fa-user" /></InputAddon>
                                                                    <InputGroup
                                                                        id="login-username-input"
                                                                        name="login-username-input"
                                                                        onChange={this.handleUsernameChange}
                                                                        placeholder="Your login"
                                                                        value={inputUsernameValue}
                                                                    />
                                                                    <InputAddonTooltip fontClass="fa" fontClassIcon="fa-question">
                                                                        {"If you can't remember the username, you can "}
                                                                        <Link className="link link-blue" link="/recover">click here</Link>
                                                                        {" to recover the account at any time."}
                                                                    </InputAddonTooltip>
                                                                </Input>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="grid-cell">

                                                        <div className="grid grid-center grid-full lg-grid-fit">

                                                            <div className="grid-cell input-label-holder">

                                                                <Input>
                                                                    <label htmlFor="login-password-input">Password:</label>
                                                                </Input>

                                                            </div>

                                                            <div className="grid-cell">

                                                                <Input className="login-password-input with-border-radius with-addons">
                                                                    <InputAddon><i className="fa fa-asterisk" /></InputAddon>
                                                                    <InputGroup
                                                                        id="login-password-input"
                                                                        name="login-password-input"
                                                                        onChange={this.handlePasswordChange}
                                                                        placeholder="Your password"
                                                                        value={inputPasswordValue}
                                                                        rightElement={viewPasswordButton}
                                                                        type={showPassword ? "text" : "password"}
                                                                    />
                                                                    <InputAddonTooltip fontClass="fa" fontClassIcon="fa-question">
                                                                        {"If you can't remember the password, you can "}
                                                                        <Link className="link link-blue" link="/recover">click here</Link>
                                                                        {" to recover the account at any time."}
                                                                    </InputAddonTooltip>
                                                                </Input>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    {
                                                        error || session.fetching
                                                            ? (
                                                                <div className="grid-cell">

                                                                    <div className="grid grid-center grid-full lg-grid-fit">

                                                                        <div className="grid-cell input-label-holder" />

                                                                        <div className="grid-cell">
                                                                            {
                                                                                error ? (
                                                                                    <div className="error-message">
                                                                                        {error.reason
                                                                                            || Array.concat(error.username || error.password || [])[0]}
                                                                                    </div>
                                                                                ) : session.fetching ? "Verifying" : null
                                                                            }
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            )
                                                            : null
                                                    }

                                                    <div className="grid-cell">

                                                        <div className="grid grid-center grid-full lg-grid-fit">

                                                            <div className="grid-cell input-label-holder" />

                                                            <div className="grid-cell">

                                                                <div className="submit-container">
                                                                    <button
                                                                        className="btn btn-custom btn-custom-green btn-custom-full btn-custom-font btn-custom-opacity btn-login"
                                                                        type="button"
                                                                        onClick={this.handleFormSubmit}
                                                                    >
                                                                        Login
                                                                    </button>
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </Form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                ) : null;
    }
}

Login.propTypes = {};
Login.defaultProps = {};
Login.contextTypes = {
    router: PropTypes.object.isRequired,
};
Login.constraints = {
    username: {
        presence: true,
        isString: true,
        length: {
            minimum: 3,
            maximum: 32,
        },
        format: {
            pattern: "^[a-zA-Z0-9][a-zA-Z0-9_.]+[a-zA-Z0-9]$",
        },
    },
    password: {
        presence: true,
        isString: true,
        length: {
            minimum: 6,
            maximum: 32,
        },
        format: {
            pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$",
        },
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);