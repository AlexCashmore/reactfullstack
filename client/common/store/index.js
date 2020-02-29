import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import rootReducer from "../reducers";

const debugStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, promise(), logger()),
);

const productionStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, promise()),
);

export default process.env.DEBUG ? debugStore : productionStore;