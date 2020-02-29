import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AccountPermissionsContentActions from "./AccountPermissionsContentActions";
import AccountPermissionsDataTable from "./AccountPermissionsDataTable";

import * as pageActions from "../../../../../actions/pageActions";
import * as organizationActions from "../../../../../actions/organizationActions";
import Spinner from "../../../../UIComponents/Spinner";
import DataTable from "../../../SharedComponents/DataTable";

class AccountPermissions extends Component {
    componentDidMount() {
        const { loadPage, lang, location } = this.props;
        this.props.changeTitle('Users');

        this.props.fetchUserByOrganization(this.props.settings.selectedOrganizationId, this.props.user.session.account.userId, this.props.user.session.account.token);
    }

    componentWillMount() {
        this.setState({
            pageValue:1,
            inputSearchValue: "",
            inputStatusValue: {
                title: "All Users",
                value: "all",
            },
        });
    }

    get handleStatusChange() {
        return (value) => {
            this.setState({
                inputStatusValue: value,
            });
        };
    }

    get handleSearchChange() {
        return (e) => {
            this.setState({
                inputSearchValue: e.target.value,
                pageValue:1,
            });
            console.log('change',this.state.pageValue);

            this.forceUpdate();
        };
    }
    firstPage() {
        this.setState({ pageValue: 1 });
    }

    lastPage(routes) {
        console.log(routes);
        let pageValue = Math.ceil(routes.length / 5);
        if(pageValue < 1) { pageValue = 1; }
        this.setState({ pageValue });
    }

    changePage(direction,routes) {
        let page = this.state.pageValue;

        console.log("...", direction);
        if(direction === "+1") {
            let pageMax = Math.ceil(routes.length / 5);
            if(pageMax===page) {

            }
            else{
                console.log('paging',page,pageMax);
                page+=1}
        } else {
            if(page !== 1) {
                page -= 1;
            }
            page = page;
        }
        this.setState({ pageValue:page });
        this.forceUpdate();
    }


    render() {
        if(this.props.users.fetched&&!this.props.users.fetching&&this.props.network.organizations.fetched&&this.props.settings.selectedOrganizationId!==null) {
            return (
                <section className="account-permissions content container">
                    <div className="wrapper">
                        <div className="container">
                            <AccountPermissionsContentActions
                                statusFilterValue={this.state.inputStatusValue}
                                handleSearchChange={this.handleSearchChange.bind(this)}
                                handleStatusChange={this.handleStatusChange}
                                searchFilterValue={this.state.inputSearchValue}
                                firstPage={this.firstPage.bind(this)}
                            />
                            <AccountPermissionsDataTable
                                pageValue={this.state.pageValue}
                                changePage={this.changePage.bind(this)}
                                firstPage={this.firstPage.bind(this)}
                                lastPage={this.lastPage.bind(this)}

                                users={this.props.users.data} fetchUserByOrganization={this.props.fetchUserByOrganization} statusFilterValue={this.state.inputStatusValue} searchFilterValue={this.state.inputSearchValue} />
                        </div>
                    </div>
                </section>
            );
        }
        return (<Spinner label="Loading Users..." />);
    }
}

AccountPermissions.propTypes = {};
AccountPermissions.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        user: state.user,
        organization: state.organization.organization,
        users: state.organization.users,
        settings: state.settings,
        network:state.network,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, organizationActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPermissions);