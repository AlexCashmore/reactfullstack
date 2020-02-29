import customPayloadHandler from "../../../utils/customPayloadHandler";

const initialState = {
    fetching: false,
    fetched: false,
    error: null,
    organization: {},
    users: {
        fetching: false,
        fetched: false,
        error: null,
        data: {},
    },
    info:{},
};

export default function organization(state = initialState, action) {
    let error = null;

    switch (action.type) {


    case "FETCH_USERS_LIST_PENDING":

        return Object.assign({}, state, {
            users: Object.assign({}, state.users, {
                fetching: true,
                error: null,
            }),
        });
    case "FETCH_USERS_LIST_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "FETCH_USERS_LIST_REJECTED");

        return Object.assign({}, initialState, {
            users: Object.assign({}, initialState.users, {
                error,
            }),
        });
    case "FETCH_USERS_LIST_FULFILLED":

        return Object.assign({}, state, {
            users: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
                data:action.payload.data,
            }),
        });

        case "FETCH_ORGANIZATION_INFO_PENDING":

        return Object.assign({}, state, {
            organization: Object.assign({}, state.organization, {
                fetching: true,
                error: null,
            }),
        });
    case "FETCH_ORGANIZATION_INFO_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "FETCH_ORGANIZATION_INFO_REJECTED");

        return Object.assign({}, initialState, {
            organization: Object.assign({}, initialState.organization, {
                error,
            }),
        });

    case "FETCH_ORGANIZATION_INFO_FULFILLED":

        return Object.assign({}, state, {
            info:action.payload.data,
            organization: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
            }),
        });

    /*case "UPDATE_ORGANIZATION_INFO_PENDING":

        return Object.assign({}, state, {
            organization: Object.assign({}, state.organization, {
                fetching: true,
                error: null,
            }),
        });

    case "UPDATE_ORGANIZATION_INFO_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "UPDATE_ORGANIZATION_INFO_REJECTED");

        return Object.assign({}, initialState, {
            organization: Object.assign({}, initialState.organization, {
                error,
            }),
        });

    case "UPDATE_ORGANIZATION_INFO_FULFILLED":

        return Object.assign({}, initialState, {
            organization: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
            }),
        });*/
    case "CREATE_ORGANIZATION_PENDING":

        return Object.assign({}, state, {
            organization: Object.assign({}, state.organization, {
                fetching: true,
                error: null,
            }),
        });

    case "CREATE_ORGANIZATION_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "CREATE_ORGANIZATION_REJECTED");

        return Object.assign({}, initialState, {
            organization: Object.assign({}, initialState.organization, {
                error,
            }),
        });

    case "CREATE_ORGANIZATION_FULFILLED":

        return Object.assign({}, initialState, {
            organization: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
            }),
        });

    default:
        return state;
    }
}