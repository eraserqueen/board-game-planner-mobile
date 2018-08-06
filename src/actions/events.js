import _ from 'lodash';
import * as db from "../data/api";

export const GET_EVENT_LIST = 'GET_EVENT_LIST';
export const SAVE_EVENT = 'SAVE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const UPDATE_PLAYER_PREFERENCE = 'UPDATE_PLAYER_PREFERENCE';

export const EVENT_LIST_RECEIVED = 'EVENT_LIST_RECEIVED';
export const EVENT_SAVED = 'EVENT_SAVED';
export const EVENT_DELETED = 'EVENT_DELETED';

function getEventList() {
    return {
        type: GET_EVENT_LIST
    };
}

function eventListReceived(events) {
    return {
        type: EVENT_LIST_RECEIVED,
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

function eventDeleted(id) {
    return {
        type: EVENT_DELETED,
        id
    };
}

function addPlayer(event, playerName) {
    return {
        type: ADD_PLAYER,
        event,
        playerName
    };
}

function removePlayer(event, playerName) {
    return {
        type: REMOVE_PLAYER,
        event,
        playerName
    };
}

function updatePlayerPreference(event, playerName, order, gameId) {
    return {
        type: UPDATE_PLAYER_PREFERENCE,
        event,
        playerName,
        order,
        gameId
    }
}


export function getAllEvents() {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(getEventList());
        return db.getEvents().then(events => dispatch(eventListReceived(events)));
    };
}

export function deleteEventFromList(id) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(deleteEvent(id));
        return db.deleteEvent(id).then(() => dispatch(eventDeleted(id)));
    };
}

export function saveEventToList(event) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(saveEvent(event));
        return db.saveEvent(event).then((savedEvent) => dispatch(eventSaved(savedEvent)));
    };
}

export function joinEvent(event) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        const playerName = getState().auth.username;
        dispatch(addPlayer(event, playerName));
        const updatedPrefs = (event.playerPreferences || []).concat([{playerName, preferences: []}]);
        const updatedEvent = Object.assign({}, event, {playerPreferences: updatedPrefs});
        return db.saveEvent(updatedEvent)
            .then(savedEvent => dispatch(eventSaved(savedEvent)));
    };
}

export function leaveEvent(event) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        const playerName = getState().auth.username;
        dispatch(removePlayer(event, playerName));
        const updatedPrefs = event.playerPreferences.filter(p => p.playerName !== playerName);
        const updatedEvent = Object.assign({}, event, {playerPreferences: updatedPrefs});
        return db.saveEvent(updatedEvent)
            .then(savedEvent => dispatch(eventSaved(savedEvent)));
    };
}

export function setGamePreference(eventId, order, gameId) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        const playerName = getState().auth.username;
        const event = _.find(getState().events.list, {id: eventId});
        dispatch(updatePlayerPreference(event, playerName, order, gameId));

        const currentPrefs = _.find(event.playerPreferences, {playerName}).preferences || [];
        const updatedPrefs = currentPrefs.filter(p => p.order !== order).concat([{order, gameId}]);
        const updatedEvent = Object.assign({}, event, {
            playerPreferences: event.playerPreferences
                .filter(p => p.playerName !== playerName)
                .concat([{playerName, preferences: updatedPrefs}])
        });
        return db.saveEvent(updatedEvent)
            .then(savedEvent => dispatch(eventSaved(savedEvent)));
    }
}
