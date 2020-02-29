import customPayloadHandler from "../../../utils/customPayloadHandler";

const initialState = {
    fetching: false,
    fetched: false,
    strings: {},
    error: null,
};

export default function strings(state = initialState, action) {
    let error = null;

    switch (action.type) {
    case "LOAD_STRINGS_PENDING":
        return Object.assign({}, state, {
            fetching: true,
            fetched: false,
            error: null,
        });
    case "LOAD_STRINGS_REJECTED":

        error = customPayloadHandler.analyse(action.payload);

        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: Object.assign({}, error),
            strings: {},
        });
    case "LOAD_STRINGS_FULFILLED":
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: null,
            strings: Object.assign({}, action.payload.data),
        });
    default:
        return state;
    }
}