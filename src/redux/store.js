import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import loggerMiddleware from 'redux-logger';

import chat from 'reducers/chatReducer';

const middleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
);

const store = createStore(
    combineReducers({
        chat,
    }),
    (process.env.NODE_ENV == 'development') ? middleware.concat([
        loggerMiddleware
    ]) : middleware
);

export default store;