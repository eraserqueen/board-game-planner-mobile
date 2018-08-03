import {combineReducers} from 'redux';
import auth from './auth';
import events from "./events";
import games from "./games";

const rootReducer = combineReducers({
    auth,
    events,
    games
});

export default rootReducer;
