import React, {Component} from 'react';
import {FlatList, ScrollView} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import UserHeader from "./UserHeader";
import connect from "react-redux/es/connect/connect";
import { addPlayerToEvent, getAllEvents, removePlayerFromEvent} from "../actions/events";


class EventList extends Component {
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.props.getAllEvents();
        });
    };

    handleAddEvent = () => {
        this.props.navigation.navigate('createEvent');
    };
    handleEditEvent = (event) => {
        this.props.navigation.navigate('editEvent', event);
    };
    handlePlayerJoin = (event) => {
        this.props.addPlayer(event, this.props.auth.username);
    };
    handlePlayerQuit = (event) => {
        this.props.removePlayer(event, this.props.auth.username);
    };

    render() {
        return [
            <ScrollView key="main" style={{padding: 15, paddingLeft: 10, paddingRight: 10}}>
                <UserHeader/>
                {this.props.isFetching && <Text>Loading...</Text>}
                <FlatList
                    key="eventList"
                    data={this.props.events}
                    renderItem={({item}) => <EventCard event={item}
                                                       onEdit={() => this.handleEditEvent(item)}
                                                       onPlayerJoin={() => this.handlePlayerJoin(item)}
                                                       onPlayerQuit={() => this.handlePlayerQuit(item)}
                    />}
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


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        events: state.events.list,
        isFetching: state.isFetching,
        auth: {username: state.auth.username}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEvents: () => {
            dispatch(getAllEvents());
        },
        addPlayer: (event, playerName) => {
            dispatch(addPlayerToEvent(event, playerName))
        },
        removePlayer: (event, playerName) => {
            dispatch(removePlayerFromEvent(event, playerName))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EventList);