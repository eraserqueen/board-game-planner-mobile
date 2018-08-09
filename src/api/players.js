import fetch from "../utils/apiRequestBuilder";

export function getAll() {
    return fetch('/players')
        .then(response => response.json())
        .catch(error => console.error(error));
}