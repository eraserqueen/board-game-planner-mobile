import {authClient} from "../api";

export const CREATE_SESSION = 'CREATE_SESSION';
export const SESSION_CREATED = 'SESSION_CREATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

function createSession() {
    return {
        type: CREATE_SESSION,
    };
}
function sessionCreated({user, token}) {
    return {
        type: SESSION_CREATED,
        user,
        token
    };
}


function authenticationError() {
    return {
        type: AUTHENTICATION_ERROR
    }
}

export function registerNewUser(username, password) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(createSession());
        return authClient().register(username, password).then(session => {
            if(!session.token) {
                return dispatch(authenticationError());
            }
            return dispatch(sessionCreated(session));
        });
    };
}

export function checkCredentials(username, password) {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(createSession());
        return authClient().createSession(username, password).then(session => {
            if(!session.token) {
                return dispatch(authenticationError());
            }
            return dispatch(sessionCreated(session));
        });
    };
}

export function logout() {
    return {
        type: LOGOUT_USER
    };
}
