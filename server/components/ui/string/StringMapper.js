class StringMapper {
    constructor(dbConnection) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: false,
            value: dbConnection.collection("strings"),
        });
    }

    // TODO: fix Strings API to load strings from a file

    getStringsByLangCode(langCode) {
        return new Promise((resolve, reject) => {
            this.collection.find({
                langCode,
            }, (err, docs) => {
                /* istanbul ignore if */
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    getString(token, langCode) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                token,
                langCode,
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

    getStrings() {
        return new Promise((resolve, reject) => {
            this.collection.aggregate([
                {
                    $group: {
                        _id: {
                            langCode: "$langCode",
                            token: "$token",
                            value: "$value",
                        },
                    },
                },
                {
                    $group: {
                        _id: "$_id.langCode",
                        strings: {
                            $push: {
                                token: "$_id.token",
                                value: "$_id.value",
                            },
                        },
                    },
                },
            ], (err, doc) => {
                /* istanbul ignore if */
                if(err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }

    updateString(token, langCode, value) {
        return new Promise((resolve, reject) => {
            this.collection.findAndModify({
                query: {
                    token,
                    langCode,
                },
                upsert: true,
                new: true,
                update: {
                    $set: {
                        value,
                        langCode,
                    },
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

    removeString(token, langCode) {
        return new Promise((resolve, reject) => {
            this.collection.remove({
                token,
                langCode,
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
}

export default StringMapper;