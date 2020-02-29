// import nodemailer from 'nodemailer'

import React from "react";
import { Provider } from "react-redux";

import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";

import configureStore from "../client/common/store";
import routes from "../client/common/routes";

/* Page API init */
import PageMapper from "./components/ui/page/PageMapper";
import PageModel from "./components/ui/page/PageModel";

/* String API init */
import StringMapper from "./components/ui/string/StringMapper";
import StringModel from "./components/ui/string/StringModel";

/* User API init */
import UserMapper from "./components/user/UserMapper";
import OrganizationMapper from "./components/organization/OrganizationMapper";
import UserInfoMapper from "./components/user/UserInfoMapper";
import UserSessionMapper from "./components/user/UserSessionMapper";
import UserModel from "./components/user/UserModel";
import UserInfoModel from "./components/user/UserInfoModel";
import UserSessionModel from "./components/user/UserSessionModel";

module.exports = (expressApp, mongoConnection, mongoStorageConnection) => {
    const defaultLang = {
        langCode: "en",
        locale: "en_EN",
    };

    const pageMapper = new PageMapper(mongoStorageConnection);
    const stringMapper = new StringMapper(mongoStorageConnection);

    const userSessionMapper = new UserSessionMapper(mongoConnection);
    const userInfoMapper = new UserInfoMapper(mongoConnection);
    const userMapper = new UserMapper(mongoConnection);
    const organizationMapper = new OrganizationMapper(mongoConnection);

    const pageModel = new PageModel({
        pageMapper,
    });
    const stringModel = new StringModel({
        stringMapper,
    });

    const userSessionModel = new UserSessionModel({
        userSessionMapper,
        userMapper,
    });
    const userInfoModel = new UserInfoModel({
        userInfoMapper,
    });

    const userModel = new UserModel({
        userMapper,
        organizationMapper,
    }, {
        userSessionModel,
        userInfoModel,
        userRecoverModel: null,
    });


    // Initialize all APIs

    // Page API
    require("./components/ui/page")(expressApp, {
        pageModel,
    });
    // String API
    require("./components/ui/string")(expressApp, {
        stringModel,
    });
    // User API
    require("./components/user")(expressApp, {
        userModel, userSessionModel, userInfoModel,
    });

    // Everything else is passed to the REACT router.
    expressApp.get("*", (req, res) => {
        stringModel.getStringsByLangCode(defaultLang.langCode).then((stringsMap) => {
            try {
                const cleanAbsolutePath = req.url
                    .replace(/\/+/g, "/"); // replace consecutive slashes with a single slash

                match({ routes, location: cleanAbsolutePath }, (error, redirectLocation, renderProps) => {
                    if(error) {
                        res.status(500).send(error.message);
                    } else if(redirectLocation) {
                        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                    } else if(renderProps) {
                        try {
                            const storeConfigObject = {
                                lang: defaultLang,
                                strings: {
                                    fetching: false,
                                    error: null,
                                    fetched: true,
                                    strings: stringsMap,
                                },
                            };

                            pageModel.getPage(defaultLang.langCode, cleanAbsolutePath).then((pageDetails) => {
                                storeConfigObject.page = {
                                    fetching: false,
                                    error: null,
                                    fetched: true,
                                    page: pageDetails,
                                };

                                const store = configureStore(storeConfigObject);

                                const htmlString = `<!DOCTYPE html>${renderToString(
                                    <Provider store={store}>
                                        <RouterContext {...renderProps} />
                                    </Provider>,
                                )}`;

                                if(renderProps.routes[1].path === "*") {
                                    res.status(404).send(htmlString);
                                } else {
                                    res.status(200).send(htmlString);
                                }
                            }).catch((exc) => {
                                console.log("Error:", exc);
                                res.status(500).end();
                            });
                        } catch (e) {
                            console.log("Error:", e);
                            res.status(500).send(`<pre>${e.stack}</pre>`);
                        }
                    } else {
                        res.status(404).end();
                    }
                });
            } catch (exception) {
                console.log("Exception caught:", exception);
            }
        }).catch((exc) => {
            console.log("Error", exc);
            res.status(500).end();
        });
    });
};