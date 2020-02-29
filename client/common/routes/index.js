import React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";

import App from "../components/Layout/App";
import ErrorSection from "../components/RouteComponents/Pages/ErrorSection";

/* Page Layouts */
import General from "../components/RouteComponents/PageLayouts/General";
import Authorized from "../components/RouteComponents/PageLayouts/Authorized";

/* Pages */
import Dashboard from "../components/RouteComponents/PageComponents/Dashboard";

import AccountSettings from "../components/RouteComponents/PageComponents/Account/AccountSettings";

/* Page Components */
import HeaderNavigation from "../components/RouteComponents/SharedComponents/Header/HeaderNavigation";
import FooterNavigation from "../components/RouteComponents/SharedComponents/Footer/FooterNavigation";
import HeaderSearchSelector from "../components/RouteComponents/SharedComponents/Header/HeaderSearchSelector";
import HeaderDatePickerSelector from "../components/RouteComponents/SharedComponents/Header/HeaderDatePickerSelector";
import AccountContentNavigation from "../components/RouteComponents/PageComponents/Account/AccountContentNavigation";

export default (
    <Route path="/" component={App}>
        <Route component={General}>
            <IndexRoute components={{
                headerNavigation: HeaderNavigation,
                main: Authorized,
                innerContainer: Dashboard,
                footerNavigation: FooterNavigation,
            }}
            />
            <Route path="account">
                <IndexRedirect to="settings" />
                <Route
                    path="settings"
                    components={{
                        headerNavigation: HeaderNavigation,
                        headerContentNavigation: AccountContentNavigation,
                        headerOtherNavigation: HeaderDatePickerSelector,
                        main: Authorized,
                        innerContainer: AccountSettings,
                        footerNavigation: FooterNavigation,
                    }}
                />
            </Route>
            <Route path="*" component={ErrorSection} />
        </Route>
    </Route>
);