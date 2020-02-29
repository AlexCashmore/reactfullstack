import axios from "axios";

axios.defaults.baseURL = "/api/v1/";

export function loadPage(langCode, path) {
    return {
        type: "LOAD_PAGE",
        payload: axios.get(`/ui/page/${encodeURIComponent(langCode)}/${encodeURIComponent(path)}`),
    };
}

export function changeTitle(title) {
    return {
        type: "CHANGE_TITLE",
        payload: {
            title,
        },
    };
}

export function changeSEO(description, keywords) {
    return {
        type: "CHANGE_SEO",
        payload: {
            description,
            keywords,
        },
    };
}

export function changeMETA(siteName, author, canonical, publisher) {
    return {
        type: "CHANGE_META",
        payload: {
            siteName,
            author,
            canonical,
            publisher,
        },
    };
}

export function updateCustomClass(customClass) {
    return {
        type: "CHANGE_CUSTOM_CLASS",
        payload: {
            customClass,
        },
    };
}

export function updateDate(date) {
    return {
        type: "CHANGE_DATE",
        payload: {
            date: date,
        },
    };
}
export function updateRouteFilter(filter) {
    return {
        type: "CHANGE_FILTER",
        payload: {
            filter,
        },
    };
}
export function updateDay(day) {
    return {
        type: "CHANGE_DAY",
        payload: {
            day,
        },
    };
}
export function toggleLegendAction(legend) {
    return {
        type: "TOGGLE_LEGEND",
        payload: {
            legend,
        },
    };
}
export function updateAnalyticsRangeType(type) {
    return {
        type: "CHANGE_RANGE",
        payload: {
            type,
        },
    };
}
export function updateAnalyticsLevelType(type) {
    return {
        type: "CHANGE_LEVEL",
        payload: {
            type,
        },
    };
}
export function updateComplianceRangeType(type) {
    return {
        type: "CHANGE_RANGE_COMPLIANCE",
        payload: {
            type,
        },
    };
}
export function storeOrganizationArray(organizationArray) {
    return {
        type: "STORE_ORGANIZATION_ARRAY",
        payload: {
            organizationArray,
        },
    };
}
export function getVersion() {
    return {
        type: "GET_VERSION",
        payload: axios.get("/liveprobe/"),
    };
}
export function getSelectedOrganizationData(organizationId, userId, token) {
    return {
        type: "FETCH_SELECTED_ORGANIZATION_INFO",
        payload: axios.get(`/organization/${encodeURIComponent(organizationId)}/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}
