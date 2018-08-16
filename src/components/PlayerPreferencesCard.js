import React from "react";
import {FlatList, StyleSheet} from "react-native";
import _ from 'lodash';
import gamesStyles from "../styles/games";
import GameCard from "./GameCard";

const styles = StyleSheet.create(gamesStyles);

export default function PlayerPreferencesCard({eventId, preferences, onEditPreference, onSwitchPreferenceOrder}) {
    const emptyPrefs = [{order: 1}, {order: 2}, {order: 3}];
    const orderedPrefs = _.orderBy(_.assign({}, emptyPrefs, preferences), 'order', 'asc');
    return (<FlatList
        listKey={`${eventId}-prefs`}
        keyExtractor={item => `${eventId}-pref-${item.order}`}
        style={styles.gamesList}
        data={orderedPrefs}
        renderItem={({item}) => <GameCard game={item} style={[styles.gameWrapper, styles.gamePref]}
                                          onEditPreference={onEditPreference}
                                          onSwitchPreferenceOrder={(orderFrom, orderTo) => onSwitchPreferenceOrder(orderedPrefs[orderFrom-1], orderedPrefs[orderTo-1])} />
        }
    />);
}