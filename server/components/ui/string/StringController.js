import validate from "../../../../utils/customValidate";

class StringController {
    constructor(stringModel) {
        Object.defineProperty(this, "stringModel", {
            enumerable: true,
            configurable: false,
            value: stringModel,
        });
    }

    get getStringsByLangCode() {
        return (req, res) => {
            const validationErrors = {
                params: validate(req.params, this.constructor.constraints.getStringsByLangCode.params),
            };

            if(validationErrors.params) {
                return Promise.resolve(res.status(404).json(validationErrors.params));
            }

            return this.stringModel.getStringsByLangCode(req.params.langCode)
                .then(stringsMap => res.status(200).json(stringsMap))
                .catch(() => res.status(500).json({
                    reason: "Internal Server Error",
                    status: 500,
                }).end());
        };
    }
}

StringController.constraints = {
    getStringsByLangCode: {
        params: {
            langCode: {
                presence: true,
                isString: true,
                length: {
                    is: 2,
                },
            },
        },
    },
};

StringController.specs = {
    "/ui/strings/:langCode": {
        GET: {
            method: "getStringsByLangCode",
            description: "This endpoint will return all strings of a language.",
            constraints: StringController.constraints.getStringsByLangCode,
        },
    },
};

export default StringController;