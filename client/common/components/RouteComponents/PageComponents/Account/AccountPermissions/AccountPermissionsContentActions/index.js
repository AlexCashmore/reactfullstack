import React, { Component } from "react";
import PropTypes from "prop-types";

import {
    MenuItem, Position, Button, InputGroup,
} from "@blueprintjs/core";

import { Select } from "@blueprintjs/select";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InputAddon from "../../../../../UIComponents/Input/InputAddon";
import Input from "../../../../../UIComponents/Input";
import Link from "../../../../../UIComponents/Link";

import Search from "../../../../SharedComponents/Entities/Search";

import * as pageActions from "../../../../../../actions/pageActions";

class AccountPermissionsContentActions extends Component {
    componentWillMount() {
        this.setState({
            inputSearchValue: "",
            inputUserValue: {
                title: "All Users",
                value: "all",
            },
        });
    }

    get handleUserChange() {
        return (value) => {
            this.setState({
                inputUserValue: value,
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

    render() {
        const { inputSearchValue, inputUserValue } = this.state;

        const userList = {
            items: [
                {
                    title: "All Users",
                    value: "all",
                },
                {
                    title: "Active",
                    value: true,
                },
                {
                    title: "Inactive",
                    value: false,
                },
            ],
            itemPredicate: Search.filter,
            itemRenderer: AccountPermissionsContentActions.renderUser(),
        };
        return (
            <div className="account-permissions-content-actions">
                <div className="grid grid-full lg-grid-fit grid-gutters">
                    <div className="grid-cell">
                        <div className="grid grid-fit grid-gutters grid-center">
                            <div className="grid-cell grid-cell-autoSize search-action-holder">
                                <Input className="input-search-user-permission with-addons with-border-radius">
                                    <InputGroup
                                        className=""
                                        leftIcon="search"
                                        onChange={this.props.handleSearchChange}
                                        placeholder="Search for a User..."
                                        value={this.props.searchFilterValue}
                                    />
                                </Input>
                            </div>
                            <div className="grid-cell grid-cell-autoSize filter-action-holder">

                             {/*   <Input className="input-filter-user-permissions with-addons with-border-radius">
                                    <InputAddon><i className="fa fa-filter" /></InputAddon>
                                    <Select
                                        filterable
                                        hasInitialContent={false}
                                        items={userList.items}
                                        itemPredicate={userList.itemPredicate}
                                        itemRenderer={userList.itemRenderer}
                                        noResults={<MenuItem disabled text="No results." />}
                                        onItemSelect={this.props.handleStatusChange}
                                        popoverProps={
                                            {
                                                position: Position.BOTTOM,
                                            }
                                        }
                                        inputProps={
                                            {
                                                placeholder: "Filter Users",
                                            }
                                        }
                                    >
                                        <Button
                                            rightIcon="caret-down"
                                            text={this.props.statusFilterValue ? `${this.props.statusFilterValue.title}` : "All Users"}
                                            disabled={false}
                                        />
                                    </Select>
                                </Input>*/}
                            </div>
                        </div>
                    </div>
                    <div className="grid-cell grid-cell-autoSize">
                        <div className="grid grid-right grid-gutters">
                            <div className="grid-cell grid-cell-autoSize">
                                <Link link="/organization/permissions/create" className="btn btn-custom btn-custom-blue btn-custom-full btn-add-user-permission">
                                    <i className="fa fa-plus" />
                                    <span>Add User</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AccountPermissionsContentActions.propTypes = {};
AccountPermissionsContentActions.defaultProps = {};
AccountPermissionsContentActions.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPermissionsContentActions);