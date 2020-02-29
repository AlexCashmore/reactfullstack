export function parseErrors(errors) {
    let returnErrors = [];
    if(errors) {
        if(typeof errors === "string") {
            return [errors];
        }
        returnErrors = Object.keys(errors).reduce((acc, value) => ((value === "status" || value === "reason" || value === "message") && acc) || acc.concat(errors[value]), []);
        const systemError = errors.reason || errors.message;
        if(systemError && returnErrors.length === 0) {
            returnErrors.push(systemError);
        }
    }
    return returnErrors;
}

export default {
    parseErrors,
};