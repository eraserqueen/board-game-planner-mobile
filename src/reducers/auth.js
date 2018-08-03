const defaultState = {
    isLoggedIn: false,
    username: '',
    password: ''
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            // TODO: verify user login
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action.username,
            });
        case 'LOGOUT':
            return Object.assign({}, state, defaultState);
        default:
            return state;
    }
}