import {PLAYERS_LIST_UPDATED, UPDATE_PLAYERS_LIST} from "../actions/players";

export default function reducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_PLAYERS_LIST:
            return Object.assign({}, state, {isUpdating: true});
        case PLAYERS_LIST_UPDATED:
            const list = {};
            action.players.map(g => list[g.name] = g);
            return Object.assign({}, state, {isUpdating: false, list});
        default:
            return state;
    }
}