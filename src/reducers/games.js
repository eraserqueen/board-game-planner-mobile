import {REQUEST_GAMES, RECEIVE_GAMES} from "../actions/games";


export default function reducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_GAMES:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_GAMES:
            const list = {};
            action.games.map(g => list[g.id] = g);
            return Object.assign({}, state, {isFetching: false, list});
        default:
            return state;
    }
}