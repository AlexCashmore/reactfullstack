import moment from "moment";
import "moment-timezone";

export default class Moment {
    static getLongDateFormat() {
        return Moment.getMomentFormatter("LL");
    }

    static getShortDateFormat() {
        return Moment.getMomentFormatter("MMM D");
    }

    static getMomentFormatter(format) {
        return {
            formatDate: (date, locale) => moment(date).locale(locale).format(format),
            parseDate: (str, locale) => moment(str, format).locale(locale).toDate(),
        };
    }

    static getLongDateFormatter(timezone) {
        return Moment.getMomentTimezoneFormatter("LL", timezone);
    }

    static getShortDateFormatter(timezone) {
        return Moment.getMomentTimezoneFormatter("MMM D", timezone);
    }

    static getMomentTimezoneFormatter(format, timezone) {
        return {
            formatDate: (date, locale) => moment.tz(date, moment.ISO_8601, timezone).locale(locale).format(format),
            parseDate: (str, locale) => moment.tz(str, moment.ISO_8601, timezone).locale(locale).toDate(),
        };
    }
}