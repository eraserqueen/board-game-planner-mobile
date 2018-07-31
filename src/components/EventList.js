import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import { getEvents } from '../data/api';

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
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            getEvents().then(events => this.setState({events}));
        });
    }
    handleAddEvent = () => {
        this.props.navigation.navigate('createForm');
    }
    handleEventPress = (event) => {
        this.props.navigation.navigate('editForm', event);

    }
    render() {
        return [
            <FlatList
                key="flatlist"
                style={styles.list}
                data={this.state.events}
                renderItem={({ item }) => {
                    return (
                        <TouchableHighlight onPress={() => this.handleEventPress(item)}>
                            <EventCard event={item} />
                        </TouchableHighlight>
                    );
                }}
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