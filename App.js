import React from 'react';
import EventList from './src/components/EventList';
import EventForm from './src/components/EventForm';
import {createStackNavigator} from 'react-navigation';

export default createStackNavigator({
  list: {
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