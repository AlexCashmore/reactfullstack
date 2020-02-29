import { _ } from "lodash";
import uuidv4 from "uuid/v4";

import {
    InternalServerError, AppError, Conflict,
} from "../../errors";

class MessageModel {
    constructor({
        messageMapper,
    }) {
        Object.defineProperty(this, "messageMapper", {
            enumerable: true,
            configurable: false,
            value: messageMapper,
        });
    }

    /**
     * This function will parse and format a TMU type message and then save it into a database.
     * @param message
     * @returns {Promise.<Promise|*>}
     */
    async saveMessage(message) {
        const {
            unitUniqueId,
            unitName,
            logId,
            logName,
            logType,
            timestamp: logTimestamp,
            receiveDateTime,
            sourceReceiveDateTime,
            hasGeoCode,
            geoCode,
            xml: body,
        } = message;
        const cleanGeoCode = hasGeoCode ? geoCode : {};
        const {
            latitude,
            latitudeDms,
            longitude,
            isEmpty,
            isValid,
        } = cleanGeoCode;
        try {
            const messageId = await uuidv4(); // generating an uuidv4 productId
            const newMessage = {
                unitUniqueId: unitUniqueId.replace(/tmu:/gi, ""),
                unitName,
                logId,
                logName,
                logType,
                logTimestamp: new Date(logTimestamp),
                receiveAt: new Date(receiveDateTime),
                sourceReceiveAt: new Date(sourceReceiveDateTime),
                geoCode: hasGeoCode ? {
                    latitude,
                    latitudeDms,
                    longitude,
                    isEmpty,
                    isValid,
                } : null,
                hasGeoCode,
                body,
            };
            return await this.messageMapper.saveMessageForRecalculation(messageId, newMessage);
        } catch (e) {
            if(e.code === 11000) {
                throw new Conflict();
            }
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }

    async getTemperatureMessagesForRecalculation(unitUniqueId, dateRange) {
        try {
            // TODO: parse/business logic for date range?
            console.log(`Reading messages from: ${dateRange[0]} to ${dateRange[1]}`);
            console.log(`Current time for parser is: ${new Date().toISOString()}`);
            return await this.messageMapper.getTemperatureMessagesForRecalculation(unitUniqueId, dateRange);
        } catch (e) {
            if(e instanceof AppError) {
                throw e;
            }
            throw new InternalServerError(e);
        }
    }
}

export default MessageModel;