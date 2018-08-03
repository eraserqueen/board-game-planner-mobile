import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {formatDate, formatTimeRange} from '../utils/dateUtils';
import GameIcon from "./GameIcon";
import buttonStyles from '../styles/button';
import Button from "./Button";

const styles = StyleSheet.create({
    ...buttonStyles,
    eventCard: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
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
    playersList: {
        flex: 1,
        flexDirection: 'row'
    }
});

class EventCard extends Component {
    render() {
        const {event, currentUser, onEdit, onPlayerJoin, onPlayerQuit} = this.props;
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
                {event.participants &&
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text>players: </Text>
                    <FlatList
                        listKey={`${event.id}-playersList`}
                        style={styles.playersList}
                        data={event.participants}
                        renderItem={({item}) => <Text style={{flex: 1}}>{item}</Text>}
                    />
                </View>
                }
                {event.schedule &&
                    <FlatList
                        listKey={`${event.id}-gamesList`}
                        style={styles.gamesList}
                        data={event.schedule}
                        renderItem={({item}) => <GameIcon game={item}/>}
                        keyExtractor={item => `${event.id}-slot-${item.order}`}
                    />
                }
                {!event.schedule && currentUser.preferences &&
                    <FlatList
                        listKey={`${event.id}-preferences`}
                        style={styles.gamesList}
                        data={currentUser.preferences}
                        renderItem={({item}) => <GameIcon game={item}/>}
                        keyExtractor={item => `${event.id}-pref-${item.order}`}
                    />
                }
                {currentUser.isParticipant
                    ? <Button onPress={onPlayerQuit}
                              style={[styles.deleteButton, {marginLeft: 0, marginRight: 0}]}
                              text="Leave"
                    />
                    : <Button onPress={onPlayerJoin}
                              style={[styles.createButton, {marginLeft: 0, marginRight: 0}]}
                              text="Join"
                    />
                }
            </View>
        );
    }
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

function mapStateToProps(state, {event}) {
    const currentUser = {
        name: state.auth.username,
    };
    const participants = [];
    if (event.playerPreferences) {
        event.playerPreferences.map(p => {
            if (p.playerName === state.auth.username) {
                currentUser.isParticipant = true;
                currentUser.preferences = p.preferences;
                participants.push('You');
            } else {
                participants.push(p.playerName);
            }
        });
    }
    return {
        event: {...event, participants},
        currentUser
    };
}

export default connect(mapStateToProps)(EventCard);