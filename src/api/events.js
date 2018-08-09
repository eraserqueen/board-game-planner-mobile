import fetch from "../utils/apiRequestBuilder";
import uuid from "uuid";

const parseEvent = event => ({
    ...event,
    dateTimeStart: new Date(event.dateTimeStart),
    dateTimeEnd: new Date(event.dateTimeEnd)
});

export function getAll() {
    return fetch('/events')
        .then(response => response.json())
        .then(json => json.map(parseEvent))
        .catch(error => console.error(error));
}

export function addEvent({dateTimeStart, dateTimeEnd}) {
    return fetch('/events',
        {
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
    return fetch(`/events/${event.id}?runScheduler=${options.runScheduler ? 'true' : 'false'}`,
        {
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

export function deleteById(id) {
    return fetch(`/events/${id}`,
        {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then(response => response.json())
        .then(json => parseEvent(json))
        .catch(error => console.error(error));
}