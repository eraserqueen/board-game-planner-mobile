import {RECEIVE_EVENTS, REQUEST_EVENTS} from "../actions/events";


export default function reducer(state = [], action) {
    switch (action.type) {
        case REQUEST_EVENTS:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_EVENTS:
            return Object.assign({}, state, {isFetching: false, list: action.events});
        default:
            return state;
    }
}