import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventList from './EventList';
import EventForm from './EventForm';
import {createStackNavigator} from 'react-navigation';

export default createStackNavigator({
  list: {
    screen: EventList,
    navigationOptions: () => ({
      title: 'Events'
    })
  },
  createForm: {
    screen: EventForm,
    navigationOptions: () => ({
      title: 'Create event'
    })
  },
  editForm: {
    screen: EventForm,
    navigationOptions: () => ({
      title: 'Edit event'
    })
  }
});