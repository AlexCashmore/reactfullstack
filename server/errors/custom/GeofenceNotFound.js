/**
 * Created by devsnowy on 1/7/2019.
 */
module.exports = class GeofenceNotFound extends require("./../general/NotFound") {
    constructor(message = "Not Found", details = "Geofence not found") {
        // Providing default message and overriding status code.
        super(message, details, 404);
    }
};