import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import GameIcon from "./GameIcon";
import gamesStyles from "../styles/games";

const styles = StyleSheet.create(gamesStyles);

export default function PlayerPreferences({eventId, preferences}) {
    return <View>
        <Text>Your preferences</Text>
        <FlatList
            listKey={`${eventId}-prefs`}
            style={styles.gamesList}
            data={preferences}
            renderItem={({item}) => <GameIcon game={item} style={{
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#ccc',
                backgroundColor: '#ffefc7'
            }}/>}
            keyExtractor={item => `${eventId}-pref-${item.order}`}
        />
    </View>;
}