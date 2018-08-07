import React from "react";
import {FlatList, StyleSheet, TouchableHighlight} from "react-native";
import _ from 'lodash';
import GameIcon from "./GameIcon";
import gamesStyles from "../styles/games";

const styles = StyleSheet.create(gamesStyles);

export default function PlayerPreferencesCard({eventId, preferences, onEditPreference}) {
    const emptyPrefs = [{order: 1}, {order: 2}, {order: 3}];
    const orderedPrefs = _.orderBy(_.assign({}, emptyPrefs, preferences), 'order', 'asc');
    return (<FlatList
                listKey={`${eventId}-prefs`}
                keyExtractor={item => `${eventId}-pref-${item.order}`}
                style={styles.gamesList}
                data={orderedPrefs}
                renderItem={({item}) => <TouchableHighlight onPress={() => onEditPreference(item.order)}>
            <GameIcon game={item} style={styles.gamePref}
            />
        </TouchableHighlight>
        }
    />);
}