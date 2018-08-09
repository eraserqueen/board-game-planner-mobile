import {players} from "../api";

export const UPDATE_PLAYERS_LIST = 'UPDATE_PLAYERS_LIST';
export const PLAYERS_LIST_UPDATED = 'PLAYERS_LIST_UPDATED';


export function updatePlayersList() {
    return {
        type: UPDATE_PLAYERS_LIST
    };
}

export function playersListUpdated(players) {
    return {
        type: PLAYERS_LIST_UPDATED,
        players
    };
}

export function getPlayers() {
    return function (dispatch, getState) {
        if (getState().isUpdating) {
            return Promise.resolve();
        }
        dispatch(updatePlayersList());
        return players.getAll().then(players => dispatch(playersListUpdated(players)));
    };
}

