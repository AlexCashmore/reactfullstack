const initialState = {
    selectedOrganizationId: null,
    routeFilter: {
        title: "All Routes",
        value: "all",
    },
    selectedAsset: "",
    dispatchesOnly: false,
    dashboardRedirect: false,
};

export default function settings(state = initialState, action) {
    switch (action.type) {
    case "CHANGE_ORGANIZATION":
        return Object.assign({}, state, {
            selectedOrganizationId: action.payload,
        });
    case "CHANGE_FILTER":
        return Object.assign({}, state, {
            routeFilter: action.payload.filter,
        });
    case "CHANGE_ASSET":
        return Object.assign({}, state, {
            selectedAsset: action.payload,
        });
    case "UPDATE_ROUTE_SETTING":
        return Object.assign({}, state, {
            dispatchesOnly: action.payload,
        });
    case "DASHBOARD_REDIRECT":
        return Object.assign({}, state, {
            dashboardRedirect: action.payload,
        });

    default:
        return state;
    }
}