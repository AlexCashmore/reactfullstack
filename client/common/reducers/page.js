import moment from "moment";
import customPayloadHandler from "../../../utils/customPayloadHandler";

const startDate = moment.utc().toISOString();
const endDate = moment.utc().toISOString();

const initialState = {
    fetching: false,
    fetched: false,
    page: {
        title: "Default title",
        siteName: "Default site",
        description: "Default description",
        keywords: "Default keywords",
        author: "Focus Aesthetic Dynamics SRL",
        canonical: "http://www.aesthetic-dyn.com",
        publisher: "http://www.aesthetic-dyn.com",
    },
    showLegend: false,
    error: null,
    customClass: {},
    date: [startDate, endDate],
    day: startDate,
    organizationScope: "",
    type: "Week",
    levelType: "Facility",
    typeCompliance: "Week",
    version: {
        fetching: false,
        fetched: false,
        error: null,
        version: "",
    },
    selectedOrganization: {},
    organizationArray: [],
};

export default function page(state = initialState, action) {
    let error = null;

    switch (action.type) {
    case "LOAD_PAGE_PENDING":
        return Object.assign({}, state, {
            fetching: true,
            fetched: false,
            error: null,
        });
    case "LOAD_PAGE_REJECTED":

        error = customPayloadHandler.analyse(action.payload);

        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: Object.assign({}, error),
            page: Object.assign({}, state.page, {
                title: "Connection lost, please refresh the page",
            }),
        });
    case "LOAD_PAGE_FULFILLED":
        return Object.assign({}, state, {
            day: state.day,
            date: [startDate, endDate],
            fetching: false,
            fetched: true,
            error: null,
            type: "Week",
            typeCompliance: "Week",
            levelType: "Facility",
            page: Object.assign({}, {
                title: action.payload.data.title,
                siteName: action.payload.data.siteName,
                description: action.payload.data.description,
                keywords: action.payload.data.keywords,
                author: action.payload.data.author,
                canonical: action.payload.data.canonical,
                publisher: action.payload.data.publisher,
            }),
        });
    case "CHANGE_TITLE":
        return Object.assign({}, state, {
            fetching: false,
            fetched: true,
            error: null,
            page: Object.assign({}, state.page, {
                title: action.payload.title,
            }),
        });
    case "GET_VERSION_PENDING":
        return Object.assign({}, state, {
            version: {
                fetching: true,
                fetched: false,
                error: null,
            },
        });

    case "GET_VERSION_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "GET_VERSION_REJECTED");

        return Object.assign({}, state, {
            version: {
                fetching: false,
                fetched: true,
                error: Object.assign({}, state.version, {
                    error: "Connection error",
                }),
            },
        });

    case "GET_VERSION_FULFILLED":
        return Object.assign({}, state, {
            version: {
                fetching: false,
                fetched: true,
                error: null,
                version: action.payload.data.app.version,
            },
        });
    case "FETCH_SELECTED_ORGANIZATION_INFO_PENDING":

        return Object.assign({}, state, {
            selectedOrganization: Object.assign({}, state.selectedOrganization, {
                fetching: true,
                error: null,
            }),
        });
    case "FETCH_SELECTED_ORGANIZATION_INFO_REJECTED":

        error = customPayloadHandler.analyse(action.payload, "FETCH_SELECTED_ORGANIZATION_INFO_REJECTED");

        return Object.assign({}, state, {
            selectedOrganization: Object.assign({}, state.selectedOrganization, {
                error,
            }),
        });

    case "FETCH_SELECTED_ORGANIZATION_INFO_FULFILLED":

        return Object.assign({}, state, {
            info: action.payload.data,
            selectedOrganization: Object.assign({}, action.payload.data, {
                fetching: false,
                fetched: true,
                error: null,
            }),
        });

    case "CHANGE_CUSTOM_CLASS":
        return Object.assign({}, state, {
            customClass: Object.assign({}, action.payload.customClass),
        });
    case "CHANGE_DATE":
        return Object.assign({}, state, {
            date: action.payload.date,
        });
    case "TOGGLE_LEGEND":
        return Object.assign({}, state, {
            showLegend: action.payload.legend,
        });
    case "CHANGE_DAY":
        return Object.assign({}, state, {
            day: action.payload.day,
            date: [action.payload.day, action.payload.day],
        });
    case "CHANGE_RANGE":
        return Object.assign({}, state, {
            type: action.payload.type,
        });
    case "CHANGE_LEVEL":
        return Object.assign({}, state, {
            levelType: action.payload.type,
        });
    case "CHANGE_RANGE_COMPLIANCE":
        return Object.assign({}, state, {
            typeCompliance: action.payload.type,
        });
    case "STORE_ORGANIZATION_ARRAY":
        return Object.assign({}, state, {
            organizationArray: action.payload.organizationArray,
        });

    default:
        return state;
    }
}