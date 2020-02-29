import axios from "axios";

axios.defaults.baseURL = "/api/v1/";

export function register(username, email, password, confirmPassword,organizationId,token,userId) {
    return {
        type: "CREATE_USER",
        payload: axios.put("/user", {
            username,
            email,
            password,
            confirmPassword,
            organizationId,
            token,
            userId,
        }),
    };
}
//todo activate user endpoint
export function activateUser(userId,organizationId,token) {
    return {
        type: "ACTIVATE_USER",
        payload: axios.put("/user", {
            userId,
            organizationId,
            token,
        }),
    };
}

export function login(username, password) {
    return {
        type: "USER_SESSION_LOGIN",
        payload: axios.post("/user/session", {
            username,
            password,
        }),
    };
}

export function logout(userId, token) {
    return {
        type: "USER_SESSION_LOGOUT",
        payload: axios.delete(`/user/session/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}

export function verify(userId, token) {
    return {
        type: "USER_SESSION_VERIFY",
        payload: axios.get(`/user/session/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}

export function userAccount(userId, token) {
    return {
        type: "USER_ACCOUNT",
        payload: axios.get(`/user/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}

export function userAccountInfo(userId, token) {
    return {
        type: "USER_ACCOUNT_INFO",
        payload: axios.get(`/user/info/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`),
    };
}
export function updateUserAccountInfo(userId, token,values) {
    return {
        type: "USER_ACCOUNT_INFO_UPDATE",
        payload: axios.put(`/user/info/${encodeURIComponent(userId)}/${encodeURIComponent(token)}`,values),
    };
}


export function createRecover(email) {
    return {
        type: "USER_RECOVER_CREATE",
        payload: axios.post("/user/recover", {
            email,
        }),
    };
}

export function verifyRecover(email, token, password, confirmPassword) {
    return {
        type: "USER_RECOVER_VERIFY",
        payload: axios.delete(`/user/recover/${encodeURIComponent(email)}/${encodeURIComponent(token)}/${encodeURIComponent(password)}/${encodeURIComponent(confirmPassword)}`),
    };
}