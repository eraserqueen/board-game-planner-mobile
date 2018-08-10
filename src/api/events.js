import {authClient} from "../utils/ApiSessionManager";
import uuid from "uuid";

export default function init(options) {
    const client = authClient.init(options.token);

    const parseEvent = event => ({
        ...event,
        dateTimeStart: new Date(event.dateTimeStart),
        dateTimeEnd: new Date(event.dateTimeEnd)
    });


    function getAll() {
        return client.fetch(`/events?dateTimeEnd_gte=${(new Date()).toISOString()}`)
            .then(response => response.json())
            .then(json => json.map(parseEvent))
            .catch(error => console.error(error));
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
            .then(response => response.json())
            .then(json => parseEvent(json))
            .catch(error => console.error(error));
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
            .then(response => response.json())
            .then(json => parseEvent(json))
            .catch(error => console.error(error));
    }

    function deleteById(id) {
        return client.fetch(`/events/${id}`,
            {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(json => parseEvent(json))
            .catch(error => console.error(error));
    }

    return ({
        getAll,
        addEvent,
        updateEvent,
        deleteById
    });
}