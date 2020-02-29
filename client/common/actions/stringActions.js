import axios from "axios";

axios.defaults.baseURL = "/api/v1/";

export default function loadStrings(langCode) {
    return {
        type: "LOAD_STRINGS",
        payload: axios.get(`/ui/strings/${langCode}`),
    };
}