import {UPDATE_GAMES_LIST, GAMES_LIST_UPDATED} from "../actions/games";


export default function reducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_GAMES_LIST:
            return Object.assign({}, state, {isUpdating: true});
        case GAMES_LIST_UPDATED:
            const list = {};
            action.games.map(g => list[g.id] = g);
            return Object.assign({}, state, {isUpdating: false, list});
        default:
            return state;
    }
}