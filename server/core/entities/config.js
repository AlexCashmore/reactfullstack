export const temperatureConfig = {
    types: ["celsius", "fahrenheit"],
    typesSymbols: {
        celsius: "C",
        fahrenheit: "F",
    },
    defaultTemperatureUnit: "fahrenheit",
};

export const timezonesConfig = {
    defaultTimezone: "UTC",
};

export const routeFlags = {
    routeHasAsset: 1,
    routeIsScheduled: 1 << 1,
    routeHasProducts: 1 << 2,
    routeScheduledStartPassed: 1 << 3,
    routeScheduledEndPassed: 1 << 4,
};

const routeStatusIncomplete = {
    mask: 0,
    text: "incomplete",
};

const routeStatusReadyToStart = {
    mask: routeFlags.routeHasAsset | routeFlags.routeIsScheduled | routeFlags.routeHasProducts,
    text: "ready-to-start",
};

const routeStatusInProgress = {
    mask: routeStatusReadyToStart.mask | routeFlags.routeScheduledStartPassed,
    text: "in-progress",
};

const routeStatusCompleted = {
    mask: routeStatusInProgress.mask | routeFlags.routeScheduledEndPassed,
    text: "completed",
};

export const scheduleConfig = {
    types: ["manual", "daily", "daily-no-weekend", "weekly", "every-other-day", "every-other-week", "mon-wed-fri", "tue-thu-sat", "sun-tue-thu"],
    typesDailyTriggered: ["daily", "daily-no-weekend", "weekly", "every-other-day", "every-other-week", "mon-wed-fri", "tue-thu-sat", "sun-tue-thu"],
};

export const routeConfig = {
    statuses: {
        incomplete: routeStatusIncomplete,
        readyToStart: routeStatusReadyToStart,
        inProgress: routeStatusInProgress,
        completed: routeStatusCompleted,
    },
    simulatedTemperatureInterval: 5 * 60, // 5 * 60 - 5 min in seconds for distance to simulate the temperatures
    simulatedTemperatureInterpolation: true, // Interpolate the temperature with last known temperature logger if no new messages are received
};

export const productConfig = {
    coefficients: {
        frozen: {
            b: [0.010546, 0.021091, 0.010546],
            a: [1, -0.083062, -0.874756],
        },
        chilled: {
            b: [0.002268, 0.004536, 0.002268],
            a: [1, -1.73937, 0.748442],
        },
    },
    types: ["frozen", "chilled"],
};

export const compartmentConfig = {
    compartments: {
        frozen: 1,
        chilled: 2,
    },
    types: [1, 2],
};

export const organizationConfig = {
    types: ["shipper", "carrier", "distribution"],
    typesText: {
        shipper: "Shipper",
        carrier: "Carrier",
        distribution: "Distribution",
    },
    connectionTypes: ["distribution"],
};

export const eventConfig = {
    recalculationRequest: {
        type: "recalculationRequest",
        message: "Route recalculation requested",
    },
    routeStart: {
        type: "routeStart",
        message: "Route started",
    },
    routeEnd: {
        type: "routeEnd",
        message: "Route ended",
    },
    doorOpened: {
        type: "doorOpened",
        message: "Reefer door opened",
    },
    doorClosed: {
        type: "doorClosed",
        message: "Reefer door closed",
    },
    geofenceEnter: {
        type: "geofenceEnter",
        message: "Entering stop geofence",
    },
    geofenceLeave: {
        type: "geofenceLeave",
        message: "Leaving stop geofence",
    },
    reeferOn: {
        type: "reeferOn",
        message: "Reefer was turned on",
    },
    reeferOff: {
        type: "reeferOff",
        message: "Reefer was turned off",
    },
    motionStart: {
        type: "motionStart",
        message: "Vehicle is now moving",
    },
    motionStop: {
        type: "motionStop",
        message: "Vehicle is holding position",
    },
    reeferInfo: {
        type: "reeferInfo",
        message: "Reefer information received",
    },
    shipperAlertMaxStop: {
        type: "shipperAlertMaxStop",
        message: "Simulated product temperature is decreasing to normalize for shipper high limit.",
    },
    shipperAlertMaxStart: {
        type: "shipperAlertMaxStart",
        message: "Simulated product temperature is exceeding shipper high threshold.",
    },
    shipperAlertMinStop: {
        type: "shipperAlertMinStop",
        message: "Simulated product temperature is increasing to normalize for shipper low limit.",
    },
    shipperAlertMinStart: {
        type: "shipperAlertMinStart",
        message: "Simulated product temperature is exceeding shipper low threshold.",
    },
    carrierAlertMaxStop: {
        type: "carrierAlertMaxStop",
        message: "Simulated product temperature is decreasing to normalize for carrier high limit.",
    },
    carrierAlertMaxStart: {
        type: "carrierAlertMaxStart",
        message: "Simulated product temperature is exceeding carrier high threshold.",
    },
    carrierAlertMinStop: {
        type: "carrierAlertMinStop",
        message: "Simulated product temperature is increasing to normalize for carrier low limit.",
    },
    carrierAlertMinStart: {
        type: "carrierAlertMinStart",
        message: "Simulated product temperature is exceeding carrier low threshold.",
    },
};

export const jobsSchedule = {
    jobSyncAssets: "0 */2 * * *", // Every 2 hours
    jobSyncGeofences: "0 */2 * * *", // Every 2 hours
    jobRoutesRecalculation: "*/5 * * * *", // Every 5 minutes
    jobRoutesEndingRecalculation: "*/5 * * * *", // Every 5 minutes
    jobTemplatesScheduler: "0 0 * * *", // Every day
};

export const redisNamespaces = {
    message: "message",
    lastMessage: "lastMessage",
};

export const routesRecalculation = {
    timeDiffForMessagesRecalculationFlag: 5 * 60 * 1000, // 5 minutes
};

export default {
    temperatureConfig,
    timezonesConfig,
    routeFlags,
    routeConfig,
    scheduleConfig,
    productConfig,
    compartmentConfig,
    organizationConfig,
    eventConfig,
    jobsSchedule,
    redisNamespaces,
    routesRecalculation,
};