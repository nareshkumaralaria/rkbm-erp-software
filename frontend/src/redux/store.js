// import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index.js';
import rootSaga from '../sagas/index.js';

//creating saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: window.devToolsExtension && window.devToolsExtension(),
});

// runing root saga
sagaMiddleware.run(rootSaga);

export default store;