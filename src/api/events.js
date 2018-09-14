import {authClient} from "../utils/ApiSessionManager";
import uuid from "uuid";

export default function init(options) {
    const client = authClient.init(options.token);

    const parseResponse = response => {
        if(response.ok) {
            return response.json();
        }
        return Promise.reject('unexpected response from server: '+ response.status);
    };
    const parseEvent = event =>
        ({
            ...event,
            dateTimeStart: new Date(event.dateTimeStart),
            dateTimeEnd: new Date(event.dateTimeEnd)
        });

    const logErrorToConsole = error => console.error(error);

    function getAll() {
        return client.fetch(`/events?dateTimeEnd_gte=${(new Date()).toISOString()}`)
            .then(parseResponse)
            .then(json => json.map(parseEvent))
            .catch(logErrorToConsole);
    }

    function addEvent({dateTimeStart, dateTimeEnd}) {
        return client.fetch('/events',
            {
                method: "POST",
                body: JSON.stringify({
                    id: uuid(),
                    dateTimeStart: dateTimeStart.toISOString(),
                    dateTimeEnd: dateTimeEnd.toISOString(),
                })
            })
            .then(parseResponse)
            .then(parseEvent)
            .catch(logErrorToConsole);
    }

    function updateEvent(event, options = {runScheduler: false}) {
        return client.fetch(`/events/${event.id}?runScheduler=${options.runScheduler ? 'true' : 'false'}`,
            {
                method: "PUT",
                body: JSON.stringify(Object.assign({}, event, {
                    dateTimeStart: event.dateTimeStart.toISOString(),
                    dateTimeEnd: event.dateTimeEnd.toISOString(),
                }))
            })
            .then(parseResponse)
            .then(parseEvent)
            .catch(logErrorToConsole);
    }

    function deleteById(id) {
        return client.fetch(`/events/${id}`,
            {
                method: 'DELETE'
            })
            .then(parseResponse)
            .then(parseEvent)
            .catch(logErrorToConsole);
    }

    return ({
        getAll,
        addEvent,
        updateEvent,
        deleteById
    });
}