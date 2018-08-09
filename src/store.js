import {applyMiddleware, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import rootReducer from './reducers'
import {getGames} from "./actions/games";
import {getPlayers} from "./actions/players";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
));
store.dispatch(getGames());
store.dispatch(getPlayers());

const persistor = persistStore(store);

export { store, persistor };
