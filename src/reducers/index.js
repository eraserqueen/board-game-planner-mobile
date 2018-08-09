import {combineReducers} from 'redux';
import auth from './auth';
import events from "./events";
import games from "./games";
import players from "./players";

const rootReducer = combineReducers({
    auth,
    events,
    games,
    players
});

export default rootReducer;
