import {authClient} from "../utils/ApiSessionManager";

export default function init(options) {
    const client = authClient.init(options.token);

    function getAll() {
        return client.fetch('/players')
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    return ({
        getAll
    });
}