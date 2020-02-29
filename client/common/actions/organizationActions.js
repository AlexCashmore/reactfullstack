import axios from "axios";

axios.defaults.baseURL = "/api/v1/";

export function fetchNetworkConnectionsById(userId, token, organizationId) {
    return {
        type: "FETCH_NETWORK_CONNECTIONS",
        payload: axios.get(`/organization/connections/${encodeURIComponent(organizationId)}/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}
export function deleteNetworkConnectionById(userId, token, connectionId) {
    return {
        type: "DELETE_NETWORK_CONNECTION",
        payload: axios.delete(`/organization/connection/${encodeURIComponent(connectionId)}/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}

export function createNetworkConnection(userId, token, type, source, destination) {
    return {
        type: "CREATE_NETWORK_CONNECTION",
        payload: axios.put("/organization/connection", {
            userId, token, type, source, destination,
        }),
    };
}

export function fetchOrganizationInfo(organizationId, userId, token) {
    return {
        type: "FETCH_ORGANIZATION_INFO",
        payload: axios.get(`/organization/${encodeURIComponent(organizationId)}/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}
export function fetchUserByOrganization(organizationId, userId, token) {
    return {
        type: "FETCH_USERS_LIST",
        payload: axios.get(`/organization/users/${encodeURIComponent(organizationId)}/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}

export function updateOrganizationById(organizationId, userId, token, values) {
    return {
        type: "UPDATE_ORGANIZATION_INFO",
        payload: axios.put(`/organization/${encodeURIComponent(organizationId)}/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`, values),
    };
}

export function createOrganizationById(values) {
    return {
        type: "CREATE_ORGANIZATION",
        payload: axios.put("/organization", values),
    };
}

export function changeOrganization(organization) {
    return {
        type: "CHANGE_ORGANIZATION",
        payload: organization,
    };
}