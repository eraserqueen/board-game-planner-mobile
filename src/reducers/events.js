import {
    ADD_PLAYER, DELETE_EVENT, EVENT_DELETED, EVENT_SAVED,
    PLAYER_ADDED,
    PLAYER_REMOVED,
    RECEIVE_EVENTS,
    REMOVE_PLAYER,
    REQUEST_EVENTS, SAVE_EVENT
} from "../actions/events";
import _ from "lodash";


export default function reducer(state = [], action) {
    let updatedEvents;
    switch (action.type) {
        case SAVE_EVENT:
        case DELETE_EVENT:
        case REQUEST_EVENTS:
            return Object.assign({}, state, {
                isFetching: true,
                isUpdating: false
            });
        case ADD_PLAYER:
        case REMOVE_PLAYER:
            return Object.assign({}, state, {
                isFetching: false,
                isUpdating: true
            });
        case RECEIVE_EVENTS:
            return Object.assign({}, state, {
                isFetching: false,
                isUpdating: false,
                list: _.orderBy(action.events, 'dateTimeStart', 'asc')
            });
        case EVENT_DELETED:
            updatedEvents = state.list
                .filter(e => e.id !== action.id);
            return Object.assign({}, state, {
                isFetching: false,
                isUpdating: false,
                list: _.orderBy(updatedEvents, 'dateTimeStart', 'asc')
            });
        case EVENT_SAVED:
        case PLAYER_ADDED:
        case PLAYER_REMOVED:
            updatedEvents = state.list
                .filter(e => e.id !== action.event.id)
                .concat([action.event]);
            return Object.assign({}, state, {
                isFetching: false,
                isUpdating: false,
                list: _.orderBy(updatedEvents, 'dateTimeStart', 'asc')
            });
        default:
            return state;
    }
}