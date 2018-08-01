import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import {formatDate, formatTimeRange} from '../utils/dateUtils';
import GameIcon from "./GameIcon";
import buttonStyles from '../styles/button';

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
    }
});

export default function EventCard({event, onEdit, onSetPreferences}) {
    return (
        <View style={styles.eventCard}>
            <View style={styles.eventCardHeader}>
                <View style={{flex:2}}>
                    <Text style={{fontSize: 20}}>{formatDate(event.dateTimeStart)}</Text>
                    <Text>{formatTimeRange(event.dateTimeStart, event.dateTimeEnd)}</Text>
                </View>
                <TouchableHighlight onPress={onEdit} style={[styles.button, styles.editButton, {flex:1}]}>
                    <Text style={[styles.buttonText, {fontSize:15}]}>Edit Event</Text>
                </TouchableHighlight>
            </View>
            {event.schedule
                ? <FlatList
                    key="gameslist"
                    style={styles.gamesList}
                    data={event.schedule}
                    renderItem={({item}) => <GameIcon game={item}/>}
                    keyExtractor={item => item.id}
                />
                : <TouchableHighlight onPress={onSetPreferences}
                                      style={[styles.button, styles.createButton, {marginLeft:0,marginRight:0}]}>
                    <Text style={styles.buttonText}>Set game preferences</Text>
                </TouchableHighlight>
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
        }))
    })
};

