import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {formatDate, formatTimeRange} from '../utils/dateUtils';
import GameIcon from "./GameIcon";
import buttonStyles from '../styles/button';
import Button from "./Button";

const styles = StyleSheet.create({
    ...buttonStyles,
    eventCard: {
        flex: 1,
        margin: 10,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    eventCardHeader: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    editButton: {
        backgroundColor: '#ccc',
        height: 40,
        margin: 0
    },
    gamesList: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 5
    },
    playersList: {}
});

export default function EventCard({event, onEdit, onPlayerJoin, onPlayerQuit}) {
    return (
        <View style={styles.eventCard}>
            <View style={styles.eventCardHeader}>
                <View style={{flex: 2}}>
                    <Text style={{fontSize: 20}}>{formatDate(event.dateTimeStart)}</Text>
                    <Text>{formatTimeRange(event.dateTimeStart, event.dateTimeEnd)}</Text>
                </View>
                <Button
                    onPress={onEdit}
                    style={[styles.editButton, {flex: 1}]}
                    textStyle={{fontSize: 15}}
                    text="Edit Event"
                />
            </View>
            {event.playerPreferences &&
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text>players: </Text>Text>
                <FlatList
                    listKey={`${event.id}-playersList`}
                    style={styles.playersList}
                    data={event.playerPreferences}
                    renderItem={({item}) => <Text>{item.playerName}</Text>}
                    keyExtractor={item => item.playerName}
                />
            </View>
            }
            {event.schedule
                ? <View>
                    <FlatList
                        listKey={`${event.id}-gamesList`}
                        style={styles.gamesList}
                        data={event.schedule}
                        renderItem={({item}) => <GameIcon game={item}/>}
                        keyExtractor={item => item.id}
                    />
                    <Button onPress={onPlayerQuit}
                            style={[styles.deleteButton, {marginLeft: 0, marginRight: 0}]}
                            text="Leave"
                    />
                </View>
                : <Button onPress={onPlayerJoin}
                          style={[styles.createButton, {marginLeft: 0, marginRight: 0}]}
                          text="Join"
                />
            }
        </View>
    );
}

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string,
        dateTimeStart: PropTypes.instanceOf(Date),
        dateTimeEnd: PropTypes.instanceOf(Date),
        schedule: PropTypes.arrayOf(PropTypes.shape({
            order: PropTypes.number,
            gameId: PropTypes.string,
        })),
        playerPreferences: PropTypes.arrayOf(PropTypes.shape({
            playerName: PropTypes.string,
            preferences: PropTypes.arrayOf(PropTypes.shape({
                order: PropTypes.number,
                gameId: PropTypes.string,
            }))
        }))
    })
};

