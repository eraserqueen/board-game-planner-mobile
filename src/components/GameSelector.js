import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import _ from 'lodash';
import GameIcon from "./GameIcon";
import {setGamePreference} from "../actions/events";
import styles from "../styles/games";

class GameSelector extends Component {

    handleGameSelected(game) {
        this.props.onGameSelected({
            eventId: this.props.eventId,
            order: this.props.order,
            gameId: game.id
        });
        this.props.navigation.goBack();
    }

    render() {
        return (<FlatList
            keyExtractor={item => item.id}
            style={styles.gamesList}
            data={this.props.games}
            renderItem={({item}) => (<TouchableHighlight onPress={() => this.handleGameSelected(item)}>
                <GameIcon game={item} style={styles.gameSelectorItem}/>
            </TouchableHighlight>)
            }
        />);
    }

}


const mapStateToProps = (state, ownProps) => {
    const {eventId, order} = ownProps.navigation.state.params;
    const currentPrefs = state.events.list
        .filter(e => e.id === eventId)[0].playerPreferences
        .filter(p => p.playerName === state.auth.username);
    const allGames = _.values(state.games.list);
    const selectedGames = currentPrefs.map(p => p.gameId || undefined);
    const availableGames = allGames.filter(g => !selectedGames.includes(g.id));
    return {
        eventId,
        order,
        games: availableGames,
        navigation: ownProps.navigation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGameSelected: ({eventId, order, gameId}) => {
            dispatch(setGamePreference(eventId, order, gameId))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(GameSelector);