const collector = {};

collector.counter = 0;
collector.interval = 1000;

const actionsCollector = collector;

collector.mw = function mw() {
    return (req, res, next) => {
        function afterResponse() {
            res.removeListener("finish", afterResponse);
            res.removeListener("close", afterResponse);

            collector.counter--;
        }

        res.on("finish", afterResponse);
        res.on("close", afterResponse);

        collector.counter++;

        next();
    };
};

collector.executeWhenEmpty = function executeWhenEmpty(callback, checkTimeInterval) {
    const checkInterval = setInterval(() => {
        if(actionsCollector.counter === 0) {
            if(typeof callback === "function") {
                callback();
            }

            clearInterval(checkInterval);
        }
    }, checkTimeInterval || actionsCollector.interval);

    return checkInterval;
};

module.exports = collector;