import validate from "../../../../utils/customValidate";

class PageController {
    constructor(pageModelInstance) {
        Object.defineProperty(this, "pageModelInstance", {
            enumerable: true,
            configurable: false,
            value: pageModelInstance,
        });
    }

    get getPage() {
        return (req, res) => {
            const validationErrors = {
                params: validate(req.params, this.constructor.constraints.getPage.params),
            };

            if(validationErrors.params) {
                return Promise.resolve(res.status(404).json(validationErrors.params));
            }

            return this.pageModelInstance.getPage(req.params.langCode, req.params.path)
                .then(pagesMap => res.status(200).json(pagesMap))
                .catch(() => res.status(500).json({
                    reason: "Internal Server Error",
                    status: 500,
                }).end());
        };
    }
}

PageController.constraints = {
    getPage: {
        params: {
            langCode: {
                presence: true,
                isString: true,
                length: {
                    is: 2,
                },
            },
            path: {
                presence: true,
                isString: true,
                length: {
                    minimum: 1,
                    maximum: 500,
                },
            },
        },
    },
};

PageController.specs = {
    "/ui/page/:langCode/:path": {
        GET: {
            method: "getPage",
            description: "This endpoint will return the details of a page.",
            constraints: PageController.constraints.getPage,
        },
    },
};

export default PageController;