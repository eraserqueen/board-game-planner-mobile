import Expo from 'expo';
import uuid from 'uuid';
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

export function addEvent({dateTimeStart, dateTimeEnd}) {
    const url = `${baseUrl}/events`;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id: uuid(),
            dateTimeStart: dateTimeStart.toISOString(),
            dateTimeEnd: dateTimeEnd.toISOString(),
        })
    })
        .then(response => response.json())
        .then(json => parseEvent(json))
        .catch(error => console.error(error));
}

export function updateEvent(event, options = {runScheduler: false}) {
    const url = `${baseUrl}/events/${event.id}?runScheduler=${options.runScheduler?'true':'false'}`;
    console.log(event);
    return fetch(url, {
        method: "PUT",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(Object.assign({}, event, {
            dateTimeStart: event.dateTimeStart.toISOString(),
            dateTimeEnd: event.dateTimeEnd.toISOString(),
        }))
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
