import {getEvents} from "../data/api";

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export function requestEvents() {
    return {
        type: REQUEST_EVENTS
    };
}

export function receiveEvents(events) {
    return {
        type: RECEIVE_EVENTS,
        events
    };
}

export function getAllEvents() {
    return function (dispatch, getState) {
        if (getState().isFetching) {
            return Promise.resolve();
        }
        dispatch(requestEvents());
        return getEvents().then(events => dispatch(receiveEvents(events)));
    };
}