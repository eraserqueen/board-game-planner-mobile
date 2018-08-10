import {AUTHENTICATION_ERROR, CREATE_SESSION, LOGOUT_USER, SESSION_CREATED} from "../actions/auth";

const defaultState = {
    inProgress: false,
    isLoggedIn: false,
    username: '',
    password: '',
    error: null,
    token: null
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case CREATE_SESSION:
            return Object.assign({}, state, {
                inProgress: true
            });
        case SESSION_CREATED:
            return Object.assign({}, state, {
                inProgress: false,
                isLoggedIn: true,
                username: action.user.name,
                token: action.token,
                error: null
            });
        case AUTHENTICATION_ERROR:
            return Object.assign({}, state, {inProgress: false, error: 'Authentication error'});
        case LOGOUT_USER:
            return Object.assign({}, state, defaultState);
        default:
            return state;
    }
}