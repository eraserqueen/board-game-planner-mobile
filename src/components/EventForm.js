import React, {Component} from 'react';
import {View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDateTime} from '../utils/dateUtils';
import {saveEvent, deleteEvent} from '../data/api';
import buttonStyles from '../styles/button';
import Button from "./Button";

const styles = StyleSheet.create({
    ...buttonStyles,
    fieldContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#ffffff'
    },
    text: {
        height: 40,
        margin: 0,
        marginRight: 7,
        marginLeft: 10
    },
    borderTop: {
        borderColor: '#eefeff',
        borderTopWidth: 0.5
    }
});

class EventForm extends Component {
    state = {
        hasChanged: false,
        showDatePicker: false,
        dateTimeStart: null,
        dateTimeEnd: null,
        datePickerTarget: null,
        datePickerInitialValue: new Date(),
        datePickerMinimumDate: new Date(),
    };

    componentDidMount() {
        if (this.props.navigation.state.routeName == 'editEvent') {
            this.setState(this.props.navigation.state.params);
        }
    }

    handleDatePress = (datePickerTarget) => {
        let datePickerInitialValue = new Date();
        let datePickerMinimumDate = new Date();
        if (this.state[datePickerTarget]) {
            datePickerInitialValue = new Date(this.state[datePickerTarget]);
        }
        if (datePickerTarget == 'dateTimeEnd') {
            datePickerMinimumDate = this.state.dateTimeStart || new Date();
            datePickerInitialValue = new Date(Math.max(datePickerInitialValue.valueOf(), this.state.dateTimeStart.valueOf()));
        }
        this.setState({
            hasChanged: true,
            showDatePicker: true,
            datePickerTarget,
            datePickerInitialValue,
            datePickerMinimumDate
        });
    };
    handleDatePicked = (value) => {
        const newState = {
            showDatePicker: false,
            datePickerTarget: '',
            datePickerInitialValue: new Date()
        };
        newState[this.state.datePickerTarget] = new Date(value);
        this.setState(newState);
    };
    handleDatePickerHide = () => {
        this.setState({showDatePicker: false, datePickerTarget: ''});
    };
    handleAddPress = () => {
        saveEvent(this.state).then(res =>
            this.props.navigation.goBack()
        );
    };
    handleDeletePress = () => {
        deleteEvent(this.state.id).then(res =>
            this.props.navigation.goBack()
        );
    };
    handleCancelPress = () => this.props.navigation.goBack();

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={styles.fieldContainer}>
                    <TextInput
                        key="dateTimeStart"
                        style={[styles.text, styles.borderTop]}
                        placeholder="Event start"
                        spellCheck={false}
                        value={formatDateTime(this.state.dateTimeStart)}
                        editable={!this.state.showDatePicker}
                        onFocus={() => this.handleDatePress('dateTimeStart')}
                    />
                    <TextInput
                        key="dateTimeEnd"
                        style={[styles.text, styles.borderTop]}
                        placeholder="Event end"
                        spellCheck={false}
                        value={formatDateTime(this.state.dateTimeEnd)}
                        editable={!this.state.showDatePicker}
                        onFocus={() => this.handleDatePress('dateTimeEnd')}
                    />
                    <DateTimePicker
                        isVisible={this.state.showDatePicker}
                        mode="datetime"
                        onConfirm={this.handleDatePicked}
                        onCancel={this.handleDatePickerHide}
                        date={this.state.datePickerInitialValue}
                        minimumDate={this.state.datePickerMinimumDate}
                    />
                </View>
                <Button onPress={this.handleAddPress} style={styles.createButton}
                        text={this.state.id ? 'Update' : 'Add'}/>
                <Button onPress={this.handleCancelPress}
                        style={styles.cancelButton}
                        text="Cancel"/>
                <Button onPress={this.handleDeletePress}
                        style={this.state.id ? styles.deleteButton : styles.cancelButton}
                        text={this.state.id ? 'Delete' : 'Cancel'}
                />
            </View>

        );
    }
}

export default EventForm;