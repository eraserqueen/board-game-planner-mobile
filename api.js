import Expo from 'expo';
import uuid from 'uuid';

const {manifest} = Expo.Constants;
const api = manifest.packagerOpts.dev ? manifest.debuggerHost.split(':').shift().concat(':3000') : 'http://produrl.com';

const url = `http://${api}/events`;

export function getEvents(){
    console.log('getting events from ', url);
    return fetch(url)
        .then(response => response.json())
        .then(json => json.map(event => ({
            id: event.id,
            dateTimeStart: new Date(event.dateTimeStart),
            dateTimeEnd: new Date(event.dateTimeEnd),
        })))
        .catch(error => console.error(error));
}

export function saveEvent({id, dateTimeStart, dateTimeEnd}) {
    let method;
    if(id) {
        url = `${url}/${id}`,
        method = 'PUT';
    } else {
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
        })
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}
export function deleteEvent(id) {
    return fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}