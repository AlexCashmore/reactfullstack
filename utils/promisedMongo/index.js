// https://github.com/verticaljelly

export function insert(collection, document) {
    return new Promise((resolve, reject) => {
        collection.insert(document, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function remove(collection, query) {
    return new Promise((resolve, reject) => {
        collection.remove(query, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function find(collection, query) {
    return new Promise((resolve, reject) => {
        collection.find(query, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function findOne(collection, query) {
    return new Promise((resolve, reject) => {
        collection.findOne(query, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function findAndModify(collection, query) {
    return new Promise((resolve, reject) => {
        collection.findAndModify(query, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function count(collection, query) {
    return new Promise((resolve, reject) => {
        collection.count(query, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}