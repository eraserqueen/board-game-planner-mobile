import React, {Component} from 'react';
import {FlatList, ScrollView} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import UserHeader from "./UserHeader";
import connect from "react-redux/es/connect/connect";
import {joinEvent, getAllEvents, leaveEvent, setGamePreference} from "../actions/events";


class EventList extends Component {
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.props.getAllEvents();
        });
    };

    handleAddEvent = () => {
        this.props.navigate('createEvent');
    };
    handleEditEvent = (event) => {
        this.props.navigate('editEvent', event);
    };
    handleJoinEvent = (event) => {
        this.props.joinEvent(event);
        this.props.navigate('editPlayerPreferences', event);
    };
    handleLeaveEvent = (event) => {
        this.props.leaveEvent(event);
    };
    handleEditPreference = (event, currentPrefs, order) => {
        this.props.navigate('selectGame', {eventId: event.id, currentPrefs, order});
    };

    render() {
        return [
            <ScrollView key="main" style={{padding: 15, paddingLeft: 10, paddingRight: 10}}>
                <UserHeader/>
                {this.props.isUpdating && <Text>Loading...</Text>}
                <FlatList
                    key="eventList"
                    data={this.props.events}
                    renderItem={({item}) => <EventCard event={item}
                                                       onEditEvent={() => this.handleEditEvent(item)}
                                                       onEditPreference={(currentPrefs, order) => this.handleEditPreference(item, currentPrefs, order)}
                                                       onJoinEvent={() => this.handleJoinEvent(item)}
                                                       onLeaveEvent={() => this.handleLeaveEvent(item)}
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


const mapStateToProps = (state, {navigation}) => {
    return {
        events: state.events.list,
        isUpdating: state.isUpdating,
        navigate: navigation.navigate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEvents: () => {
            dispatch(getAllEvents());
        },
        joinEvent: (event) => {
            dispatch(joinEvent(event))
        },
        leaveEvent: (event) => {
            dispatch(leaveEvent(event))
        },
        selectGame: (event, order, gameId) => {
            dispatch(setGamePreference(event, order, gameId))
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EventList);