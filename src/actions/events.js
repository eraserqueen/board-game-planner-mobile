import _ from 'lodash';
import * as db from "../data/api";

export const UPDATE_EVENT_LIST = 'UPDATE_EVENT_LIST';
export const EVENT_LIST_UPDATED = 'EVENT_LIST_UPDATED';
export const EVENT_SAVED = 'EVENT_SAVED';
export const EVENT_DELETED = 'EVENT_DELETED';

function updateEventList() {
    return {
        type: UPDATE_EVENT_LIST
    };
}

function eventListUpdated(events) {
    return {
        type: EVENT_LIST_UPDATED,
        events
    };
}

function eventSaved(event) {
    return {
        type: EVENT_SAVED,
        event
    };
}

function eventDeleted(id) {
    return {
        type: EVENT_DELETED,
        id
    };
}


export function getAllEvents() {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());
        return db.getEvents().then(events => dispatch(eventListUpdated(events)));
    };
}

export function deleteEventFromList(id) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());
        return db.deleteEvent(id).then(() => dispatch(eventDeleted(id)));
    };
}

export function saveEventToList(event) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());
        return db.saveEvent(event).then((savedEvent) => dispatch(eventSaved(savedEvent)));
    };
}

export function joinEvent(event) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        const playerName = getState().auth.username;
        dispatch(updateEventList());

        const emptyPrefs = _.range(1,4).map(order => ({playerName, order}));
        const updatedPrefs = (event.playerPreferences || []).concat(emptyPrefs);
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
        dispatch(updateEventList());

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
        dispatch(updateEventList());

        const currentPrefs = event.playerPreferences || [];
        const updatedPrefs = currentPrefs
            .filter(p => !(p.playerName === playerName && p.order === order))
            .concat([{playerName, order, gameId}]);
        const updatedEvent = Object.assign({}, event, {
            playerPreferences: updatedPrefs
        });
        return db.saveEvent(updatedEvent)
            .then(savedEvent => dispatch(eventSaved(savedEvent)));
    }
}
