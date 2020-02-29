import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";

import strings from "./strings";
import lang from "./lang";
import page from "./page";
import user from "./user";
import organization from "./organization";
import settings from "./settings";


const rootReducer = combineReducers({
    routing,
    strings,
    lang,
    page,
    user,
    organization,
    settings,

});

export default rootReducer;