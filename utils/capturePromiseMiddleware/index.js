let promiseArray = [];

export default class CapturePromiseMiddleware {
    static get promises() {
        return [].concat(promiseArray);
    }

    static get middleware() {
        return ref => next => (action) => {
            const currentAction = action;

            if(!(currentAction.payload instanceof Promise)) {
                return next(currentAction);
            }

            // first dispatch the PENDING
            next({
                type: `${currentAction.type}_PENDING`,
                payload: {},
            });

            currentAction.payload.marker = `${currentAction.type}___${(new Date()).getTime()}__${Math.random()}`;
            promiseArray = [].concat(currentAction.payload);

            // process the promise now.
            return currentAction.payload.then((result) => {
                promiseArray = promiseArray.filter(item => item.marker !== currentAction.payload.marker);

                ref.dispatch({
                    type: `${currentAction.type}_FULFILLED`,
                    payload: result,
                });

                return Promise.resolve(true);
            }).catch((reason) => {
                promiseArray = promiseArray.filter(item => item.marker !== currentAction.payload.marker);

                ref.dispatch({
                    type: `${currentAction.type}_REJECTED`,
                    payload: reason,
                });

                return Promise.resolve(true);
            });
        };
    }
}