class MessageMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "recalculationMessages", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("recalculationMessages"),
        });
    }

    /**
     * This function will save a message for recalculation and return true if action was an success or an error otherwise.
     * @param messageId
     * @param unitUniqueId
     * @param unitName
     * @param logId
     * @param logName
     * @param logType
     * @param logTimestamp
     * @param receiveAt
     * @param sourceReceiveAt
     * @param geoCode
     * @param hasGeoCode
     * @param body
     * @returns {Promise}
     */
    saveMessageForRecalculation(messageId, {
        unitUniqueId,
        unitName,
        logId,
        logName,
        logType,
        logTimestamp,
        receiveAt,
        sourceReceiveAt,
        geoCode,
        hasGeoCode,
        body,
    }) {
        return new Promise((resolve, reject) => {
            this.recalculationMessages.insert({
                messageId,
                unitUniqueId,
                unitName,
                logId,
                logName,
                logType,
                logTimestamp,
                receiveAt,
                sourceReceiveAt,
                geoCode,
                hasGeoCode,
                body,
                createdAt: new Date(),
            }, (err) => {
                if(err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }

    getMessagesForRecalculation(unitUniqueId, dateRange) {
        return new Promise((resolve, reject) => {
            this.recalculationMessages.find({
                $and: [
                    {
                        unitUniqueId,
                    },
                    {
                        logTimestamp: {
                            $gte: new Date(dateRange[0].toISOString()),
                            $lte: new Date(dateRange[1].toISOString()),
                        },
                    },
                ],
            }, {
                _id: 0,
                messageId: 1,
                unitUniqueId: 1,
                unitName: 1,
                logId: 1,
                logName: 1,
                logType: 1,
                logTimestamp: 1,
                receiveAt: 1,
                sourceReceiveAt: 1,
                geoCode: 1,
                hasGeoCode: 1,
                body: 1,
                createdAt: 1,
            }, {
                sort: {
                    logTimestamp: 1,
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    resolve([]);
                }
                return resolve(doc);
            });
        });
    }

    getTemperatureMessagesForRecalculation(unitUniqueId, dateRange) {
        return new Promise((resolve, reject) => {
            this.recalculationMessages.find({
                $and: [
                    {
                        unitUniqueId,
                    },
                    {
                        logTimestamp: {
                            $gte: new Date(dateRange[0]),
                            $lt: new Date(dateRange[1]),
                        },
                    },
                    {
                        logName: { $in: ["temperature1", "temperature2"] },
                    },
                ],
            }, {
                _id: 0,
                messageId: 1,
                unitUniqueId: 1,
                unitName: 1,
                logId: 1,
                logName: 1,
                logType: 1,
                logTimestamp: 1,
                receiveAt: 1,
                sourceReceiveAt: 1,
                geoCode: 1,
                hasGeoCode: 1,
                body: 1,
                createdAt: 1,
            }, {
                sort: {
                    logTimestamp: 1,
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    return reject(err);
                }
                if(!doc) {
                    resolve([]);
                }
                return resolve(doc);
            });
        });
    }
}

export default MessageMapper;