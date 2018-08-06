import Expo from 'expo';
import uuid from 'uuid';
import _ from 'lodash';
import fetch from 'cross-fetch';

const {manifest} = Expo.Constants;
const api = manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':3000') : 'http://produrl.com';

const baseUrl = `http://${api}`;

export function getGames() {
    const url = `${baseUrl}/games`;
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}

const parseEvent = event => ({
    ...event,
    dateTimeStart: new Date(event.dateTimeStart),
    dateTimeEnd: new Date(event.dateTimeEnd)
});

export function getEvents() {
    let url = `${baseUrl}/events`;
    return fetch(url)
        .then(response => response.json())
        .then(json => json.map(parseEvent))
        .catch(error => console.error(error));
}

export function saveEvent({id, dateTimeStart, dateTimeEnd, playerPreferences}) {
    let method;
    let url;
    if (id) {
        url = `${baseUrl}/events/${id}`;
        method = 'PUT';
    } else {
        url = `${baseUrl}/events`;
        id = uuid();
        method = 'POST';
    }
    return fetch(url, {
        method,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id,
            dateTimeStart: dateTimeStart.toISOString(),
            dateTimeEnd: dateTimeEnd.toISOString(),
            playerPreferences
        })
    })
    .then(response => response.json())
    .then(json => parseEvent(json))
    .catch(error => console.error(error));
}


export function deleteEvent(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => parseEvent(json))
    .catch(error => console.error(error));
}
