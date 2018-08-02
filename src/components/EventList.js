import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import {getEvents, getGame} from '../data/api';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#f3f3f3'
    }
});


class EventList extends Component {
    state = {
        events: []
    };
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            getEvents()
                .then(events =>
                    events.map(event => {
                        if (!event.schedule) {
                            return event;
                        }
                        const schedule = [];
                        event.schedule.map(slot => getGame(slot.gameId).then(game => schedule.push({
                            order: slot.order,
                            ...game
                        })));
                        return {...event, schedule};
                    }))
                .then(events => {
                    console.log(events);
                    return this.setState({events});
                });
        });
    };
    handleAddEvent = () => {
        this.props.navigation.navigate('createEvent');
    };
    handleEditEvent = (event) => {
        this.props.navigation.navigate('editEvent', event);
    };
    render() {
        return [
            <FlatList
                key="eventList"
                style={styles.list}
                data={this.state.events}
                renderItem={({ item }) => <EventCard event={item} onEdit={() => this.handleEditEvent(item)}/>}
                keyExtractor={item => item.id}
            />,
            <ActionButton
                key="btn"
                onPress={this.handleAddEvent}
                buttonColor="rgba(231,76,60,1)"
             />
        ];
    }
}

export default EventList;