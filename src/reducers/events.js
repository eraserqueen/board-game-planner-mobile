import {EVENT_DELETED, EVENT_LIST_UPDATED, EVENT_ADDED, UPDATE_EVENT_LIST, EVENT_UPDATED} from "../actions/events";
import _ from "lodash";


export default function reducer(state = [], action) {
    let updatedEvents;
    switch (action.type) {
        case UPDATE_EVENT_LIST:
            return Object.assign({}, state, {
                isUpdating: true
            });
        case EVENT_LIST_UPDATED:
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
        case EVENT_UPDATED:
            updatedEvents = state.list
                .filter(e => e.id !== action.event.id)
                .concat([action.event]);
            return Object.assign({}, state, {
                isUpdating: false,
                list: _.orderBy(updatedEvents, 'dateTimeStart', 'asc')
            });
        case EVENT_ADDED:
            updatedEvents = state.list.concat([action.event]);
            return Object.assign({}, state, {
                isUpdating: false,
                list: _.orderBy(updatedEvents, 'dateTimeStart', 'asc')
            });
        default:
            return state;
    }
}