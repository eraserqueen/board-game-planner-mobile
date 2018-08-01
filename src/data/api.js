import Expo from 'expo';
import uuid from 'uuid';
import _ from 'lodash';

const {manifest} = Expo.Constants;
const api = manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':3000') : 'http://produrl.com';

const baseUrl = `http://${api}`;

export function getGame(id) {
    if(!id) {
        return Promise.reject('no game id provided');
    }
    const url = `${baseUrl}/games/${id}`;
    console.log('fetch', url);
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}


export function getEvents(){
    let url = `${baseUrl}/events`;
    console.log('fetch', url);
    return fetch(url)
        .then(response => response.json())
        .then(json => json.map(event => {
            return ({
                ...event,
                dateTimeStart: new Date(event.dateTimeStart),
                dateTimeEnd: new Date(event.dateTimeEnd)
            });
        }))
        .then(events => _.orderBy(events, 'dateTimeStart', 'asc'))
        .catch(error => console.error(error));
}

export function saveEvent({id, dateTimeStart, dateTimeEnd}) {
    let method;
    let url;
    if(id) {
        url = `${baseUrl}/events/${id}`,
        method = 'PUT';
    } else {
        url = baseUrl;
        id = uuid();
        method = 'POST';
    }
    console.log('fetch', url);
    return fetch(url, {
        method,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            id,
            dateTimeStart: dateTimeStart.toISOString(),
            dateTimeEnd: dateTimeEnd.toISOString(),
        })
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}
export function deleteEvent(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}