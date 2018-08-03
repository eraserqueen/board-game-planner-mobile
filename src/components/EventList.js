import React, {Component} from 'react';
import {FlatList, ScrollView} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import {getEvents, getGame} from '../data/api';
import UserHeader from "./UserHeader";


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
                        console.log('get schedule');
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
        console.log(this.props);
        return [
            <ScrollView style={{padding: 15, paddingLeft:10, paddingRight:10}}>
                <UserHeader />
                <FlatList
                    key="eventList"
                    data={this.state.events}
                    renderItem={({ item }) => <EventCard event={item} onEdit={() => this.handleEditEvent(item)}/>}
                    keyExtractor={item => item.id}
                />
            </ScrollView>,
            <ActionButton
                key="btn"
                onPress={this.handleAddEvent}
                buttonColor="rgba(231,76,60,1)"
             />
        ];
    }
}

export default EventList;