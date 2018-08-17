import {applyMiddleware, combineReducers, createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {authReducer, eventsReducer, gamesReducer, playersReducer} from "./reducers";

const combinedReducers = combineReducers({
    auth: persistReducer({
        key: 'auth',
        storage,
        whitelist: ['isLoggedIn', 'username', 'token']
    }, authReducer),
    events: eventsReducer,
    games: gamesReducer,
    players: playersReducer
});
const store = createStore(combinedReducers, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
));

const persistor = persistStore(store);

export {store, persistor};
