import React, { PureComponent } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as stringActions from "../../../actions/stringActions";
import * as pageActions from "../../../actions/pageActions";

class Head extends PureComponent {
    render() {
        const {
            page,
            lang,
        } = this.props;
        const {
            title = "", description = "", keywords = "", siteName = "", author = "", canonical = "", publisher = "",
        } = page;
        const { locale = "en_EN" } = lang;

        return (
            <head>
                <title>{title}</title>
                <meta charSet="utf-8" />

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />

                <meta property="og:title" content={title} />
                <meta property="og:locale" content={locale} />
                <meta property="og:site_name" content={siteName} />

                <meta property="og:type" content="website" />
                <meta property="og:description" content={description} />

                <link rel="author" href={author} />
                <link rel="canonical" href={canonical} />
                <link rel="publisher" href={publisher} />

                <meta property="og:image" content="/resources/images/logo.png" />

                {/* External CSS styles */}
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" rel="stylesheet" type="text/css" />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                    integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                    crossOrigin="anonymous"
                />
                <link href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css" rel="stylesheet" />
                <link href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css" rel="stylesheet" />
                <link href="https://unpkg.com/@blueprintjs/datetime@3.3.1/lib/css/blueprint-datetime.css" rel="stylesheet" />

                {/* Internal CSS styles */}
                <link rel="stylesheet" href="/resources/css/bundle.css" />
            </head>
        );
    }
}

Head.propTypes = {};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, stringActions, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Head);