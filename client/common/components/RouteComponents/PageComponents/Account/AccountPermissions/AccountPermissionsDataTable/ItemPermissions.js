import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Button, InputGroup, MenuItem, Position,
} from "@blueprintjs/core";

import { Select } from "@blueprintjs/select";
import * as pageActions from "../../../../../../actions/pageActions";
import * as routeActions from "../../../../../../actions/routeActions";
import * as userActions from "../../../../../../actions/userActions";
import * as organizationActions from "../../../../../../actions/organizationActions";

import Input from "../../../../../UIComponents/Input";
import InputAddon from "../../../../../UIComponents/Input/InputAddon";
import Search from "../../../../SharedComponents/Entities/Search";

class ItemPermissions extends Component {
    componentWillMount() {
        this.setState({
            inputPermission: {
                title: "None",
                value: "none",
            },
        });
    }

    componentDidMount() {
    }

    get handlePermissionChange() {
        return (value) => {
            this.setState({
                inputPermission: value,
            });
        };
    }

    static renderClass() {
        return (temp, { handleClick, modifiers, query }) => {
            if(!modifiers.matchesPredicate) {
                return null;
            }
            return (
                <MenuItem
                    active={modifiers.active}
                    key={temp.value}
                    onClick={handleClick}
                    text={Search.highlightText(temp.title, query)}
                />
            );
        };
    }

    handleActivation(userId) {
        this.props.activateUser(
            userId, this.props.user.session.account.token, this.props.user.account.userId,
        );
        this.props.fetchUserByOrganization(this.props.settings.selectedOrganizationId, this.props.user.session.account.userId, this.props.user.session.account.token);
    }

    handleDeactivation(userId) {
        this.props.activateUser(
            userId, this.props.user.session.account.token, this.props.user.account.userId,
        );
        this.props.fetchUserByOrganization(this.props.settings.selectedOrganizationId, this.props.user.session.account.userId, this.props.user.session.account.token);
    }

    render() {
        const permissionList = {
            items: [
                {
                    title: "Deactivated",
                    value: "deactivated",
                },
                {
                    title: "Admin",
                    value: "admin",
                },
                {
                    title: "Creator",
                    value: "creator",
                },
                {
                    title: "Edit",
                    value: "edit",
                },
                {
                    title: "Read Only",
                    value: "read-only",
                },
            ],
            itemPredicate: Search.filter,
            itemRenderer: ItemPermissions.renderClass(),
        };
        return (
            <div> <div>
                <div style={{ float: "left", marginTop: 8 }}>User is Active</div>
            </div>
                {/*  <Input className="input-filter-profile-class with-addons with-border-radius">
                        <InputAddon><i className="fa fa-filter" /></InputAddon>
                        <Select
                            hasInitialContent={false}
                            items={permissionList.items}
                            itemPredicate={permissionList.itemPredicate}
                            itemRenderer={permissionList.itemRenderer}
                            noResults={<MenuItem disabled text="No results." />}
                            onItemSelect={this.props.handlePermissionChange}
                            popoverProps={
                                {
                                    position: Position.BOTTOM,
                                }
                            }
                            inputProps={
                                {
                                    placeholder: "Filter permissions",
                                }
                            }
                        >
                            <Button
                                rightIcon="caret-down"
                                text={this.props.inputProduct4Value ? `${(this.props.inputProduct4Value.title)}` : "No Permission type selected"}
                                disabled={false}
                            />
                        </Select>
                    </Input>*/}
              {/*  {this.props.active ? (
                    <div>
                        <div>
                            <div style={{ float: "left", marginTop: 8 }}>User is Active</div>
                        </div>
                        <div>
                            <div style={{ float: "right" }}>
                                {" "}
                                <div
                                    onClick={() => {
                                        this.handleDeactivation(this.props.userId);
                                    }}
                                    className="btn btn-custom btn-custom-red btn-custom-full btn-add-user-permission"
                                >
Deactivate
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <div style={{ float: "left", marginTop: 8 }}>User is Active</div>
                        </div>
                        <div>
                            <div style={{ float: "right" }}>
                                {" "}
                                <div
                                    onClick={() => {
                                        this.handleDeactivation(this.props.userId);
                                    }}
                                    className="btn btn-custom btn-custom-red btn-custom-full btn-add-user-permission"
                                >
Deactivate
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }*/}
            </div>
        );
    }
}

{ /* <div><div>
                        <div style={{float:'left',marginTop:8}}>User is Inactive</div>
                    </div>
                        <div>
                            <div style={{float:'right'}}> <div
                                onClick={() => {
                                    this.handleActivation(this.props.userId);
                                }}
                                className="btn btn-custom btn-custom-green btn-custom-full btn-add-user-permission"
                            >Activate</div>
                            </div>
                        </div>

                    </div>*/ }

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        route: state.route,
        user: state.user,
        settings: state.settings,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, routeActions, userActions, organizationActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemPermissions);