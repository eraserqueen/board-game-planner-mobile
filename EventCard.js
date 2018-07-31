import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { formatDate, formatTimeRange } from './dateUtils';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#ffffff'
    },
    cardHeader: {
        flex:1,
        flexDirection: 'column'
    },
    date: {
        fontSize: 20
    },
    time:{
        fontSize: 15
    }
});

export default function EventCard({ event }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.date}>{formatDate(event.dateTimeStart)}</Text>
                <Text style={styles.time}>{formatTimeRange(event.dateTimeStart, event.dateTimeEnd)}</Text>
            </View>
        </View>
    );
}

EventCard.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string,
        dateTimeStart: PropTypes.instanceOf(Date),
        dateTimeEnd: PropTypes.instanceOf(Date)
    })
};