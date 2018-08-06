import * as db from "../data/api";

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const SAVE_EVENT = 'SAVE_EVENT';
export const EVENT_SAVED = 'EVENT_SAVED';
export const DELETE_EVENT = 'DELETE_EVENT';
export const EVENT_DELETED = 'EVENT_DELETED';
export const ADD_PLAYER = 'ADD_PLAYER';
export const PLAYER_ADDED = 'PLAYER_ADDED';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const PLAYER_REMOVED = 'PLAYER_REMOVED';

function requestEvents() {
    return {
        type: REQUEST_EVENTS
    };
}
function receiveEvents(events) {
    return {
        type: RECEIVE_EVENTS,
        events
    };
}
function saveEvent(event) {
    return {
        type: SAVE_EVENT,
        event
    };
}
function eventSaved(event) {
    return {
        type: EVENT_SAVED,
        event
    };
}
function deleteEvent(id) {
    return {
        type: DELETE_EVENT,
        id
    };
}
function eventDeleted(events) {
    return {
        type: EVENT_DELETED,
        events
    };
}
function addPlayer(event, playerName) {
    return {
        type: ADD_PLAYER,
        event,
        playerName
    };
}
function playerAdded(event) {
    return {
        type: PLAYER_ADDED,
        event
    }
}
function removePlayer(event, playerName) {
    return {
        type: REMOVE_PLAYER,
        event,
        playerName
    };
}
function playerRemoved(event) {
    return {
        type: PLAYER_REMOVED,
        event
    }
}


export function getAllEvents() {
    return function (dispatch, getState) {
        if (getState().isFetching) {
            return Promise.resolve();
        }
        dispatch(requestEvents());
        return db.getEvents().then(events => dispatch(receiveEvents(events)));
    };
}
export function deleteEventFromList(id) {
    return function (dispatch, getState) {
        if (getState().isFetching) {
            return Promise.resolve();
        }
        dispatch(deleteEvent(id));
        return db.deleteEvent(id).then(() => dispatch(eventDeleted(id)));
    };
}
export function saveEventToList(event) {
    return function (dispatch, getState) {
        if (getState().isFetching) {
            return Promise.resolve();
        }
        dispatch(saveEvent(event));
        return db.saveEvent(event).then((savedEvent) => dispatch(eventSaved(savedEvent)));
    };
}
export function addPlayerToEvent(event, playerName) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(addPlayer(event, playerName));
        const updatedPrefs = (event.playerPreferences || []).concat([{playerName, preferences: []}]);
        const updatedEvent = Object.assign({}, event, {playerPreferences: updatedPrefs});
        return db.saveEvent(updatedEvent)
            .then(savedEvent => dispatch(playerAdded(savedEvent)));
    };
}
export function removePlayerFromEvent(event, playerName) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(removePlayer(event, playerName));
        const updatedPrefs = event.playerPreferences.filter(p => p.playerName !== playerName);
        const updatedEvent = Object.assign({}, event, {playerPreferences: updatedPrefs});
        return db.saveEvent(updatedEvent)
            .then(savedEvent => dispatch(playerRemoved(savedEvent)));
    };
}
