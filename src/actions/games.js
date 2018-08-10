import {gamesClient} from "../api";

export const UPDATE_GAMES_LIST = 'UPDATE_GAMES_LIST';
export const GAMES_LIST_UPDATED = 'GAMES_LIST_UPDATED';

function updateGamesList() {
    return {
        type: UPDATE_GAMES_LIST
    };
}

function gamesListUpdated(games) {
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

        const token = getState().auth.token;
        return gamesClient({token}).getAll().then(games => dispatch(gamesListUpdated(games)));
    };
}

