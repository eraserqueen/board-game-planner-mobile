import React, {Component} from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import UserHeader from "./UserHeader";
import connect from "react-redux/es/connect/connect";
import {joinEvent, getEvents, leaveEvent, setGamePreference, switchPreferenceOrder} from "../actions/events";
import {getPlayers} from "../actions/players";
import {getGames} from "../actions/games";


class EventList extends Component {
    componentWillMount(){
        this.props.initStore();
    }
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
    handleSwitchPreferenceOrder = (event, from, to) => {
      this.props.switchPreferenceOrder(event, from, to);
    };
    render() {
        if(this.props.isUpdating) {
            return <Text style={{margin: 100, alignSelf: 'center'}}>Loading events...</Text>
        }
        return [
            <ScrollView key="main" style={{padding: 15, paddingLeft: 10, paddingRight: 10}}>
                <UserHeader/>
                <FlatList
                    key="eventList"
                    data={this.props.events}
                    renderItem={({item}) => <EventCard event={item}
                                                       onEditEvent={() => this.handleEditEvent(item)}
                                                       onJoinEvent={() => this.handleJoinEvent(item)}
                                                       onLeaveEvent={() => this.handleLeaveEvent(item)}
                                                       onEditPreference={(currentPrefs, order) => this.handleEditPreference(item, currentPrefs, order)}
                                                       onSwitchPreferenceOrder={(from, to) => this.handleSwitchPreferenceOrder(item, from, to)}
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
        isUpdating: state.events.isUpdating || state.games.isUpdating || state.players.isUpdating,
        navigate: navigation.navigate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initStore: () => {
            dispatch(getPlayers());
            dispatch(getGames());
            dispatch(getEvents());
        },
        joinEvent: (event) => {
            dispatch(joinEvent(event))
        },
        leaveEvent: (event) => {
            dispatch(leaveEvent(event))
        },
        switchPreferenceOrder: (event, from, to) => {
            dispatch(switchPreferenceOrder(event, from, to));
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EventList);