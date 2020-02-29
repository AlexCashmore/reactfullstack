let allEndpoints = {};
let exposedMainPropfind = false;
let endpointsNamespace = "/api/v1";

export default function (expressApp, controllerInstance) {
    endpointsNamespace = endpointsNamespace[0] === "/" ? endpointsNamespace : `/${endpointsNamespace}`;

    if(!exposedMainPropfind) {
        exposedMainPropfind = true;

        expressApp.propfind(endpointsNamespace, (req, res) => {
            res.status(200).json(allEndpoints);
        });
    }

    allEndpoints = Object.assign({}, allEndpoints, controllerInstance.constructor.specs);
    endpointsNamespace = endpointsNamespace === "/" ? "" : endpointsNamespace;

    // Purposely not checking hasOwnProperty to throw an error when trying to expose inexistent HTTP verbs.
    for(const endpointUrl in controllerInstance.constructor.specs) {
        if(Object.prototype.hasOwnProperty.call(controllerInstance.constructor.specs, endpointUrl)) {
            expressApp.propfind(endpointsNamespace + endpointUrl, (req, res) => {
                res.status(200).json(controllerInstance.constructor.specs[endpointUrl]);
            });

            for(const httpVerb in controllerInstance.constructor.specs[endpointUrl]) {
                if(Object.prototype.hasOwnProperty.call(controllerInstance.constructor.specs[endpointUrl], httpVerb)) {
                    const methodName = controllerInstance.constructor.specs[endpointUrl][httpVerb].method;

                    expressApp[httpVerb.toLowerCase()](endpointsNamespace + endpointUrl, controllerInstance[methodName]);
                }
            }
        }
    }
}