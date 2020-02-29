import { match } from "react-router";
import routes from "../../../../client/common/routes";

class PageModel {
    constructor({
        pageMapper,
    }) {
        Object.defineProperty(this, "pageMapper", {
            enumerable: true,
            configurable: false,
            value: pageMapper,
        });
    }

    getPage(langCode, path) {
        return new Promise((resolve, reject) => {
            let absolutePath = path;
            try {
                match({ routes, location: absolutePath }, (error, redirectLocation, renderProps) => {
                    /* istanbul ignore if */
                    if(error || redirectLocation || !renderProps) {
                        reject(new Error({
                            reason: "Internal Server Error",
                            status: 500,
                        }));
                    } /* istanbul ignore else */ else if(renderProps) {
                        let relativePath = "";

                        /* istanbul ignore next: the match function can't be mocked without replacing the import */
                        if(absolutePath !== "/") {
                            absolutePath = absolutePath.replace(/\/+$/, ""); // remove trailing slashes

                            if(renderProps.routes.length > 0) {
                                for(const route of renderProps.routes) {
                                    if(typeof route.path !== "undefined" && route.path !== "/") {
                                        relativePath += `/${route.path}`;
                                    }
                                }
                            }
                        } else {
                            relativePath = "/";
                        }

                        /* Issue: #6: Relative Paths and Static Pages */

                        /* istanbul ignore next: the match function can't be mocked without replacing the import, code was tested with hard editing on routes */
                        this.pageMapper.getPage(langCode, absolutePath)
                            .then((doc) => {
                                let returnMap = {};

                                if(doc) {
                                    returnMap = doc;
                                    resolve(returnMap);
                                } else {
                                    this.pageMapper.getPage(langCode, relativePath)
                                        .then((relativeDoc) => {
                                            if(relativeDoc) {
                                                returnMap = relativeDoc;
                                            }

                                            resolve(returnMap);
                                        }, reject);
                                }
                            }, reject);
                    }
                });
            } catch (error) {
                /* istanbul ignore next: the match function can't be mocked without replacing the import */
                reject(new Error({
                    reason: "Internal Server Error",
                    status: 500,
                }));
            }
        });
    }
}

export default PageModel;