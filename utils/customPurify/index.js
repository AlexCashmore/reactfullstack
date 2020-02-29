//const createDOMPurify = require("dompurify");
//const { JSDOM } = require("jsdom");

//const { window } = new JSDOM("");
//const DOMPurify = createDOMPurify(window);

const autoParse = require("auto-parse");

/* Purify */

const purify = {};

/* Filters */

purify.xss = function xss(value, options) {
    return value;
    // return DOMPurify.sanitize(value, options);
};

purify.spaces = function spaces(value, options) {
    if(options && options.all) {
        return value.replace(/\s+/g, "");
    }
    return value.replace(/\s\s+/g, " ");
};

purify.parse = function parse(value, options) {
    if(options && options.type) {
        return autoParse(value, options.type);
    }
    return autoParse(value);
};

module.exports = purify;