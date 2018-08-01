import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    gameCard: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#cdedf5',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
    },
    orderNum: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold'
    },
    image: {
        height: 50,
        width: 50,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 3
    },
    title: {
        fontSize: 15
    }

});

export function GameIcon({game}) {
    return (
        <View style={styles.gameCard}>
            <Text style={styles.orderNum}>{game.order}</Text>
            {game.image &&
            <Image source={{uri: game.image}} style={styles.image}/>
            }
            <Text style={styles.title}>{game.title}</Text>

        </View>);
}

export default GameIcon;