import moment from "moment";
import "moment-recur";

import {
    scheduleConfig,
} from "../entities/config";

class SchedulerModel {
    static getDatesScheduled(scheduleType, scheduledStart) {
        if(!scheduleConfig.types.includes(scheduleType) || scheduleType === "manual") {
            return [];
        }
        let nextDates = [];
        const momentScheduledStart = moment.utc(scheduledStart).startOf("date");
        const recurrence = momentScheduledStart.recur();
        const formDate = moment.utc().startOf("date");
        const momentDelayedScheduledStart = moment(momentScheduledStart).add(1, "day");
        if(formDate.isSameOrAfter(momentDelayedScheduledStart, "day")) {
            recurrence.fromDate(formDate.subtract(1, "days"));
        } else {
            // Will always send back 1 days
            recurrence.fromDate(momentScheduledStart.subtract(1, "day"));
        }
        switch (scheduleType) {
        case "daily":
            // Daily schedule (every day including weekends)
            recurrence.every(1).day();
            // Generating the next 8 dates
            nextDates = nextDates.concat(recurrence.next(8));
            break;
        case "daily-no-weekend":
            // Daily schedule (every day except weekends)
            recurrence.every([1, 2, 3, 4, 5]).daysOfWeek();
            // Generating the next 8 dates
            nextDates = nextDates.concat(recurrence.next(8));
            break;
        case "weekly":
            // Weekly schedule (every 7 days)
            recurrence.every(1).week();
            // Generating the next 3 dates
            nextDates = nextDates.concat(recurrence.next(3));
            break;
        case "every-other-day":
            // Every other day (every two days)
            recurrence.every(2).days();
            // Generating the next 8 dates
            nextDates = nextDates.concat(recurrence.next(8));
            break;
        case "every-other-week":
            // Every other week (every two weeks)
            recurrence.every(2).weeks();
            // Generating the next 3 dates
            nextDates = nextDates.concat(recurrence.next(3));
            break;
        case "mon-wed-fri":
            recurrence.every(["mon", "wed", "fri"]).daysOfWeek();
            nextDates = nextDates.concat(recurrence.next(6));
            break;
        case "tue-thu-sat":
            recurrence.every(["tue", "thu", "sat"]).daysOfWeek();
            nextDates = nextDates.concat(recurrence.next(6));
            break;
        case "sun-tue-thu":
            recurrence.every(["sun", "tue", "thu"]).daysOfWeek();
            nextDates = nextDates.concat(recurrence.next(6));
            break;
        default:
            console.log(`Schedule rules not found for type ${scheduleType}`);
        }
        return nextDates;
    }
}

export default SchedulerModel;