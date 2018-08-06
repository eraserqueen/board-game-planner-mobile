import React from 'react';
import {createStackNavigator} from "react-navigation";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import GameSelector from "./components/GameSelector";

export default createStackNavigator({
            eventList: {
                screen: EventList,
                navigationOptions: () => ({
                    title: 'Events'
                })
            },
            createEvent: {
                screen: EventForm,
                navigationOptions: () => ({
                    title: 'Create event'
                })
            },
            editEvent: {
                screen: EventForm,
                navigationOptions: () => ({
                    title: 'Edit event'
                })
            },
            selectGame: {
                screen: GameSelector,
                navigationOptions: () => ({
                    title: 'Select game'
                })
            }
        });
