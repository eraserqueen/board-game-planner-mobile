import React from 'react';
import {createStackNavigator} from "react-navigation";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";

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
            }
        });
