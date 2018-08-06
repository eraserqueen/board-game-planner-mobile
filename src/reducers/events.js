import {
    ADD_PLAYER,
    DELETE_EVENT,
    EVENT_DELETED,
    EVENT_SAVED,
    EVENT_LIST_RECEIVED,
    REMOVE_PLAYER,
    GET_EVENT_LIST, SAVE_EVENT, UPDATE_PLAYER_PREFERENCE
} from "../actions/events";
import _ from "lodash";


export default function reducer(state = [], action) {
    let updatedEvents;
    switch (action.type) {
        case GET_EVENT_LIST:
        case SAVE_EVENT:
        case DELETE_EVENT:
        case ADD_PLAYER:
        case REMOVE_PLAYER:
        case UPDATE_PLAYER_PREFERENCE:
            return Object.assign({}, state, {
                isUpdating: true
            });
        case EVENT_LIST_RECEIVED:
            return Object.assign({}, state, {
                isUpdating: false,
                list: _.orderBy(action.events, 'dateTimeStart', 'asc')
            });
        case EVENT_DELETED:
            updatedEvents = state.list
                .filter(e => e.id !== action.id);
            return Object.assign({}, state, {
                isUpdating: false,
                list: _.orderBy(updatedEvents, 'dateTimeStart', 'asc')
            });
        case EVENT_SAVED:
            updatedEvents = state.list
                .filter(e => e.id !== action.event.id)
                .concat([action.event]);
            return Object.assign({}, state, {
                isUpdating: false,
                list: _.orderBy(updatedEvents, 'dateTimeStart', 'asc')
            });
        default:
            return state;
    }
}