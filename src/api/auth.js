import {unAuthClient} from "../utils/ApiSessionManager";

export default function init(options = {}) {

    function createSession(username, password) {
        return unAuthClient.fetch('/auth',
            {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    return ({
        createSession
    });
}