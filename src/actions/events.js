import _ from 'lodash';
import * as db from "../data/api";

export const UPDATE_EVENT_LIST = 'UPDATE_EVENT_LIST';
export const EVENT_LIST_UPDATED = 'EVENT_LIST_UPDATED';
export const EVENT_ADDED = 'EVENT_ADDED';
export const EVENT_UPDATED = 'EVENT_UPDATED';
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

function eventAdded(event) {
    return {
        type: EVENT_ADDED,
        event
    };
}
function eventUpdated(event) {
    return {
        type: EVENT_UPDATED,
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

export function deleteEvent(id) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());
        return db.deleteEvent(id).then(() => dispatch(eventDeleted(id)));
    };
}

export function saveEvent(event) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());

        if(event.id) {
            return db.updateEvent(event).then((savedEvent) => dispatch(eventUpdated(savedEvent)));
        } else {
            return db.addEvent(event).then((savedEvent) => dispatch(eventAdded(savedEvent)));
        }
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
        return db.updateEvent(updatedEvent)
            .then(savedEvent => dispatch(eventUpdated(savedEvent)));
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
        return db.updateEvent(updatedEvent)
            .then(savedEvent => dispatch(eventUpdated(savedEvent)));
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
        return db.updateEvent(updatedEvent)
            .then(savedEvent => dispatch(eventAdded(savedEvent)));
    }
}

export function generateSchedule(event){
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());

        return db.updateEvent(event, {runScheduler: true})
            .then(scheduledEvent => dispatch(eventAdded(scheduledEvent)));
    }
}
export function resetSchedule(event){
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateEventList());

        const updatedEvent = Object.assign({}, event, {schedule: []});
        return db.updateEvent(updatedEvent, {runScheduler: false})
            .then(scheduledEvent => dispatch(eventUpdated(scheduledEvent)));
    }
}