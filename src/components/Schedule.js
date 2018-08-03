import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import GameIcon from "./GameIcon";

import gamesStyles from "../styles/games";

const styles = StyleSheet.create(gamesStyles);

export default function Schedule({eventId, schedule}) {
    return <View>
        <Text>Schedule</Text>
        <FlatList
            listKey={`${eventId}-gamesList`}
            style={styles.gamesList}
            data={schedule}
            renderItem={({item}) => <GameIcon game={item} style={{borderWidth: 2, borderColor: 'green'}}/>}
            keyExtractor={item => `${eventId}-slot-${item.order}`}
        />
    </View>;
}