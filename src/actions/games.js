import {getGames} from "../data/api";

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';


export function requestGames() {
    return {
        type: REQUEST_GAMES
    };
}

export function receiveGames(games) {
    return {
        type: RECEIVE_GAMES,
        games
    };
}

export function getAllGames() {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(requestGames());
        return getGames().then(games => dispatch(receiveGames(games)));
    };
}

