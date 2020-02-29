import storage from "store";

import customPayloadHandler from "../../../utils/customPayloadHandler";

const initialState = {
    session: {
        fetching: false,
        authorized: false,
        error: null,
    },
    account: {
        fetching: false,
        fetched: false,
        error: null,
    },
    info: {
        fetching: false,
        fetched: false,
        error: null,
    },
    register: {
        fetching: false,
        success: false,
        error: null,
    },
    recover: {
        fetching: false,
        success: false,
        error: null,
    },
    verifyRecover: {
        fetching: false,
        success: false,
        error: null,
    },
    logout: {
        fetching: false,
        success: false,
        error: null,
    },
};

export default function user(state = initialState, action) {
    let error = null;

    switch (action.type) {
    /** Login **/

    case "USER_SESSION_LOGIN_PENDING":

        return Object.assign({}, state, {
            session: Object.assign({}, state.session, {
                fetching: true,
                error: null,
            }),
        });

    case "USER_SESSION_LOGIN_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_SESSION_LOGIN_REJECTED", (status) => {
            if(status === 401) {
                if(storage.enabled) {
                    storage.remove("session");
                }
            }
        });

        return Object.assign({}, initialState, {
            session: Object.assign({}, initialState.session, {
                error,
            }),
        });

    case "USER_SESSION_LOGIN_FULFILLED":

        if(storage.enabled) {
            storage.set("session", action.payload.data);
        }

        return Object.assign({}, initialState, {
            session: Object.assign({}, initialState.session, {
                authorized: true,
                account: Object.assign({}, action.payload.data),
            }),
            logout: Object.assign({}, initialState.logout, {
                fetching: state.logout.fetching,
            }),
        });

        /** Logout **/

    case "USER_SESSION_LOGOUT_PENDING":

        if(storage.enabled) {
            storage.remove("session");
        }

        return Object.assign({}, initialState, {
            logout: Object.assign({}, initialState.logout, {
                fetching: true,
                error: null,
            }),
        });

    case "USER_SESSION_LOGOUT_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_SESSION_LOGOUT_REJECTED");

        return Object.assign({}, initialState, {
            logout: Object.assign({}, initialState.logout, {
                fetching: true,
                error,
            }),
        });

    case "USER_SESSION_LOGOUT_FULFILLED":

        return Object.assign({}, initialState, {
            logout: Object.assign({}, initialState.logout, {
                success: true,
            }),
        });

        /** Verify **/

    case "USER_SESSION_VERIFY_PENDING":

        return Object.assign({}, state, {
            session: Object.assign({}, state.session, {
                fetching: true,
                error: null,
            }),
        });

    case "USER_SESSION_VERIFY_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_SESSION_VERIFY_REJECTED", (status) => {
            if(status === 401) {
                if(storage.enabled) {
                    storage.remove("session");
                }
            }
        });

        return Object.assign({}, initialState, {
            session: Object.assign({}, initialState.session, {
                error,
            }),
        });

    case "USER_SESSION_VERIFY_FULFILLED":

        return Object.assign({}, initialState, {
            session: Object.assign({}, initialState.session, {
                authorized: true,
                account: Object.assign({}, action.payload.data),
            }),
            logout: Object.assign({}, initialState.logout, {
                fetching: state.logout.fetching,
            }),
        });

        /** Register **/

    case "CREATE_USER_PENDING":

        return Object.assign({}, state, {
            register: Object.assign({}, initialState.register, {
                fetching: true,
                error: null,
            }),
        });

    case "CREATE_USER_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "CREATE_USER_REJECTED");

        return Object.assign({}, state, {
            register: Object.assign({}, initialState.register, {
                error,
            }),
        });

    case "CREATE_USER_FULFILLED":

        return Object.assign({}, state, {
            register: Object.assign({}, initialState.register, {
                success: true,
                fetching: false,
                account: Object.assign({}, action.payload.data.account),
            }),
        });

    case "USER_ACCOUNT_PENDING":

        return Object.assign({}, state, {
            account: Object.assign({}, state.account, {
                fetching: true,
                error: null,
            }),
        });

    case "USER_ACCOUNT_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_ACCOUNT_REJECTED", (status) => {
            if(status === 401) {
                if(storage.enabled) {
                    storage.remove("session");
                }
            }
        });

        return Object.assign({}, state, {
            account: Object.assign({}, initialState.account, {
                error,
            }),
        });

    case "USER_ACCOUNT_FULFILLED":

        return Object.assign({}, state, {
            account: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
            }),
        });

        /** User Info **/

    case "USER_ACCOUNT_INFO_PENDING":

        return Object.assign({}, state, {
            info: Object.assign({}, state.info, {
                fetching: true,
                error: null,
            }),
        });

    case "USER_ACCOUNT_INFO_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_ACCOUNT_INFO_REJECTED", (status) => {
            if(status === 401) {
                if(storage.enabled) {
                    storage.remove("session");
                }
            }
        });

        return Object.assign({}, state, {
            info: Object.assign({}, initialState.info, {
                error,
            }),
        });

    case "USER_ACCOUNT_INFO_FULFILLED":

        return Object.assign({}, state, {
            info: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
            }),
        });

        /** Create Recover **/

    case "USER_RECOVER_CREATE_PENDING":

        return Object.assign({}, initialState, {
            recover: Object.assign({}, initialState.recover, {
                fetching: true,
            }),
        });

    case "USER_RECOVER_CREATE_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_RECOVER_CREATE_REJECTED");

        return Object.assign({}, initialState, {
            recover: Object.assign({}, initialState.recover, {
                error,
            }),
        });

    case "USER_RECOVER_CREATE_FULFILLED":

        return Object.assign({}, initialState, {
            recover: Object.assign({}, initialState.recover, {
                success: true,
            }),
        });

        /** Verify Recover **/

    case "USER_RECOVER_VERIFY_PENDING":

        return Object.assign({}, initialState, {
            verifyRecover: Object.assign({}, initialState.verifyRecover, {
                fetching: true,
            }),
        });

    case "USER_RECOVER_VERIFY_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "USER_RECOVER_VERIFY_REJECTED");

        return Object.assign({}, initialState, {
            verifyRecover: Object.assign({}, initialState.verifyRecover, {
                error,
            }),
        });

    case "USER_RECOVER_VERIFY_FULFILLED":

        return Object.assign({}, initialState, {
            verifyRecover: Object.assign({}, initialState.verifyRecover, {
                success: true,
            }),
        });

    default:
        return state;
    }
}