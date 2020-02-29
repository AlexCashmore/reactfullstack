class StringModel {
    constructor({
        stringMapper,
    }) {
        Object.defineProperty(this, "stringMapper", {
            enumerable: true,
            configurable: false,
            value: stringMapper,
        });
    }

    getStringsByLangCode(langCode) {
        return this.stringMapper.getStringsByLangCode(langCode)
            .then((docs) => {
                const returnMap = {};
                docs.map((item) => {
                    returnMap[item.token] = item.value;
                    return returnMap;
                });
                return returnMap;
            });
    }
}

export default StringModel;