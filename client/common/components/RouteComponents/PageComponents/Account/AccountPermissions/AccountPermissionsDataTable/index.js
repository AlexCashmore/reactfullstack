import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DataTable from "../../../../SharedComponents/DataTable";

import * as pageActions from "../../../../../../actions/pageActions";
import * as userActions from "../../../../../../actions/userActions";
import ItemPermissions from "./ItemPermissions";

class AccountPermissionsDataTable extends Component {
    componentWillMount(){
        this.setState({
            page:1,
        })
    }
    get handleActiveChange() {
        return (value) => {
            this.setState({
                inputStatusValue: value,
            });
        };
    }
    static get itemPermissionsRenderFunction() {
        return itemData => <ItemPermissions {...itemData.value} />;
    }


    AggregateData(beginArray) {
        return (
            this.props.users.map((i, index, array) => (beginArray.push({
                name: {
                    value: i.username,
                    className: "",
                },
                emailAddress: {
                    value: i.email,
                    className: "",
                },

                action: {
                    value:{
                        active:i.active,
                        userId:i.userId,
                    },
                    renderFunction:AccountPermissionsDataTable.itemPermissionsRenderFunction,
                },

            }))));
    }

    checkStatus(instance, status) {
        if(status.value === "all") { return true; }
        return instance.action.value === status.value;
    }

    checkSearchTerm(instance, searchTerm, status) {
        searchTerm = searchTerm.toLowerCase();
        if(instance.action.value === status.value || status.value === "all") {
            const search = instance.name.value.toLowerCase().includes(searchTerm) || instance.emailAddress.value.toLowerCase().includes(searchTerm);
            return (search);
        }

        return instance.action.value.active=== status.value;
    }

    filterDataTable(array, search, status) {
        const isSearchArray = array.filter(i => this.checkSearchTerm(i, search, status));
        return isSearchArray;
    }


    paginateItems(items) {
        const paginated = items.filter((i, index) => {
            console.log(index,i);
            const { pageValue } = this.props;
            const rangeMax = (pageValue * 5) - 1;
            let rangeMin = rangeMax - 4;
            if(pageValue === 1) {
                rangeMin = 0;
            }
            console.log(i, index, rangeMin, rangeMax);
            return (index >= rangeMin && index <= rangeMax);
        });
        return paginated;
    }

    render() {
        const beginArray = [];
        this.AggregateData(beginArray);
        const usersArray = this.filterDataTable(beginArray, this.props.searchFilterValue, this.props.statusFilterValue);
        const paginatedItems = this.paginateItems(usersArray);

        return (
            <DataTable
                className="account-permissions-data-table"
                headings={[
                    {
                        name: {
                            value: "Name",
                            className: "",
                        },
                        emailAddress: {
                            value: "Email address",
                            className: "",
                        },
                        action: {
                            value: "User Status",
                            className: "",
                        },
                    },
                ]}
                paginateItems={this.paginateItems.bind(this)}
                changePage={this.props.changePage}
                firstPage={this.props.firstPage}
                lastPage={this.props.lastPage}
                tablePage={this.props.pageValue}
                items={paginatedItems}
                showPagination
                prePaginatedItems={usersArray}
            />
        );
    }
}

AccountPermissionsDataTable.propTypes = {};
DataTable.defaultProps = {};
AccountPermissionsDataTable.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        user: state.user,
        settings: state.settings,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, userActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPermissionsDataTable);