const initialState = {
    langCode: "en",
    locale: "en_EN",
};

export default function lang(state = initialState, action) {
    switch (action.type) {
    case "CHANGE_LANGUAGE":
        return Object.assign({}, state, {
            langCode: action.payload.langCode,
            locale: action.payload.locale,
        });
    default:
        return state;
    }
}