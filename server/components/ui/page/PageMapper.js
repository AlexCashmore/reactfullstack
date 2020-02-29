class PageMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("pages"),
        });
    }

    // TODO: fix Page API to load pages from a file

    getPage(langCode, path) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                langCode,
                path,
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    reject(err);
                } else {
                    let page = null;

                    if(doc) {
                        page = {
                            langCode: doc.langCode,
                            path: doc.path,
                            title: doc.title,
                            siteName: doc.siteName,
                            description: doc.description,
                            keywords: doc.keywords,
                            author: doc.author,
                            canonical: doc.canonical,
                            publisher: doc.publisher,
                        };
                    }

                    resolve(page);
                }
            });
        });
    }

    getPages() {
        return new Promise((resolve, reject) => {
            this.collection.find({}, (err, docs) => {
                /* istanbul ignore if */
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    removePage(langCode, path) {
        return new Promise((resolve, reject) => {
            this.collection.remove({
                langCode,
                path,
            }, (err, result) => {
                /* istanbul ignore if */
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    updatePage(path, langCode, pageData) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    langCode,
                    path,
                },
                upsert: true,
                new: true,
                update: {
                    $set: Object.assign({}, pageData, {
                        langCode,
                        path,
                    }),
                },
                fields: {
                    _id: 0,
                },
            }, (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }
}

export default PageMapper;