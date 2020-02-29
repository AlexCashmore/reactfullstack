import moment from "moment";

const validate = require("validate.js");
const purify = require("../customPurify");

validate.validators.constraints = function constraints(value, options) {
    return validate(value, options);
};

validate.validators.isObject = function isObject(value) {
    if(validate.isEmpty(value)) return null;
    return validate.isObject(value) ? null : "is not a object";
};

validate.validators.isString = function isString(value) {
    if(validate.isEmpty(value)) return null;
    return typeof value === "string" ? null : "is not a string";
};

validate.validators.isArray = function isArray(value) {
    if(validate.isEmpty(value)) return null;
    return validate.isArray(value) ? null : "is not an array";
};

validate.validators.isBoolean = function isBoolean(value) {
    if(validate.isEmpty(value)) return null;
    return typeof value === "boolean" ? null : "is not a boolean";
};

validate.validators.isInteger = function isInteger(value) {
    if(validate.isEmpty(value)) return null;
    return validate.isInteger(value) ? null : "is not an integer";
};

validate.validators.isNumber = function isNumber(value) {
    if(validate.isEmpty(value)) return null;
    return validate.isNumber(value) ? null : "is not an number";
};

validate.validators.isUnicodeName = function isUnicodeName(value) {
    /* Remove the spaces because we want to allow them */
    const noSpacesValue = value.replace(/\s/g, "");
    return typeof noSpacesValue === "string" && !!validate.isAlpha(noSpacesValue) ? undefined : "is not a name";
};

validate.validators.isDate = function isDate(value) {
    if(validate.isEmpty(value)) return null;
    return moment.utc(value, moment.ISO_8601).isValid() ? null : "is not a date";
};

validate.extend(validate.validators.datetime, {
    parse(value) {
        return moment.utc(value, moment.ISO_8601).isValid();
    },
    format(value) {
        return moment.utc(value, moment.ISO_8601).toDate();
    },
});

validate.validators.requiredWhen = function requiredWhen(value, options, key, attributes) {
    if(options) {
        const { fields, message } = options;
        let checkPresence = false;
        for(const [itemKey, itemValue] of Object.entries(fields)) {
            if(Array.isArray(itemValue)) {
                let found = false;
                for(const i in itemValue) {
                    if(Object.prototype.hasOwnProperty.call(itemValue, i)) {
                        if(itemValue[i] === attributes[itemKey]) {
                            found = true;
                        }
                    }
                }
                checkPresence = found;
            } else {
                checkPresence = itemValue === attributes[itemKey];
            }
        }
        if(checkPresence) {
            if(validate.isEmpty(value)) {
                return message;
            }
        }
    }
    return null;
};

validate.validators.inclusionWhen = function inclusionWhen(value, options, key, attributes) {
    if(options) {
        const { fields, values, message } = options;
        let checkInclusion = false;
        for(const [itemKey, itemValue] of Object.entries(fields)) {
            if(Array.isArray(itemValue)) {
                let found = false;
                for(const i in itemValue) {
                    if(Object.prototype.hasOwnProperty.call(itemValue, i)) {
                        if(itemValue[i] === attributes[itemKey]) {
                            found = true;
                        }
                    }
                }
                checkInclusion = found;
            } else {
                checkInclusion = itemValue === attributes[itemKey];
            }
        }
        if(checkInclusion) {
            if(!values.includes(value)) {
                return message;
            }
        }
    }
    return null;
};

validate.validators.arrayHasOnlyNumbers = function arrayHasOnlyNumbers(value) {
    if(validate.isEmpty(value)) return null;
    return validate.isArray(value) && value.every(val => validate.isNumber(val)) ? null : "must have only numbers";
};

validate.validators.arrayHasOnlyStrings = function arrayHasOnlyStrings(value) {
    if(validate.isEmpty(value)) return null;
    return validate.isArray(value) && value.every(val => validate.isString(val)) ? null : "must have only strings";
};

export default validate;