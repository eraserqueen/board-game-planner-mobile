import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';

import PropTypes from 'prop-types';
import {formatDate, formatTimeRange} from '../utils/dateUtils';
import buttonStyles from '../styles/button';
import Button from "./Button";
import PlayerPanel from "./PlayerPanel";
import Schedule from "./Schedule";
import PlayerPreferencesCard from "./PlayerPreferencesCard";

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
});


class EventCard extends Component {
    render() {
        const {event, currentUser, onEditEvent, onEditPreference, onSwitchPreferenceOrder, onJoinEvent, onLeaveEvent} = this.props;
        return (
            <View style={styles.eventCard}>
                <View style={styles.eventCardHeader}>
                    <View style={{flex: 2}}>
                        <Text style={{fontSize: 20}}>{formatDate(event.dateTimeStart)}</Text>
                        <Text>{formatTimeRange(event.dateTimeStart, event.dateTimeEnd)}</Text>
                    </View>
                    <Button
                        onPress={onEditEvent}
                        style={[styles.editButton, {flex: 1}]}
                        textStyle={{fontSize: 15}}
                        text="Edit Event"
                    />
                </View>
                {event.participants &&
                <PlayerPanel eventId={event.id} participants={event.participants}/>
                }
                {event.schedule &&
                <Schedule eventId={event.id} schedule={event.schedule}/>
                }
                {!event.schedule && currentUser.isParticipant &&
                <PlayerPreferencesCard
                    eventId={event.id}
                    preferences={currentUser.preferences}
                    onEditPreference={(order) => onEditPreference(currentUser.preferences, order)}
                    onSwitchPreferenceOrder={onSwitchPreferenceOrder}
                />
                }
                {currentUser.isParticipant
                    ? <Button onPress={onLeaveEvent}
                              style={[styles.deleteButton, {marginLeft: 0, marginRight: 0}]}
                              text="Leave"
                    />
                    : <Button onPress={onJoinEvent}
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
    let participants;
    if(!event.playerPreferences) {
        participants = [];
    }
    else {
        participants = _.uniqBy(event.playerPreferences.map(p => state.players.list[p.playerName]), 'name').filter(n => n !== undefined);
    }
    const currentUserPreferences = (event.playerPreferences || [])
        .filter(p => p.playerName === state.auth.username);
    return {
        event: {
            ...event,
            participants,
            schedule: _.isEmpty(event.schedule) ? null : event.schedule
        },
        currentUser: {
            preferences: currentUserPreferences,
            isParticipant: currentUserPreferences.length > 0
        }
    };
}

export default connect(mapStateToProps)(EventCard);