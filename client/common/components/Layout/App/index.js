import React, { Component } from "react";

/**
 * Redux side of things.
 */

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Head from "../Head";

import * as stringActions from "../../../actions/stringActions";
import * as pageActions from "../../../actions/pageActions";

class App extends Component {
    componentWillMount() {
        const {
            lang, strings, loadStrings,
        } = this.props;

        const { langCcode = "en" } = lang;

        if(strings.fetched === false) {
            loadStrings(langCcode);
        }
    }

    get preloaded() {
        const { lang, strings, page } = this.props;

        const __PRELOADED_STATE__ = Object.assign({
            lang,
            strings,
            page,
        });

        return {
            __html: `var __PRELOADED_STATE__ = ${JSON.stringify(__PRELOADED_STATE__)}`,
        };
    }

    render() {
        const { children, lang } = this.props;

        return (
            <html id="html" lang={lang.langCode}>
                <Head />
                <body>
                    {children}
                    <script dangerouslySetInnerHTML={this.preloaded} />

                    {/* External JS files */}

                    {/* Internal JS files */}
                    <script src="/resources/js/bundle.js" />
                </body>
            </html>
        );
    }
}

App.propTypes = {};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings,
        page: state.page,
    };
}
function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, stringActions, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);