import {games} from "../api";

export const UPDATE_GAMES_LIST = 'UPDATE_GAMES_LIST';
export const GAMES_LIST_UPDATED = 'GAMES_LIST_UPDATED';


export function updateGamesList() {
    return {
        type: UPDATE_GAMES_LIST
    };
}

export function gamesListUpdated(games) {
    return {
        type: GAMES_LIST_UPDATED,
        games
    };
}

export function getGames() {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updateGamesList());
        return games.getAll().then(games => dispatch(gamesListUpdated(games)));
    };
}

