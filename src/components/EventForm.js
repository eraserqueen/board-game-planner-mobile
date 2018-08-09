import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDateTime} from '../utils/dateUtils';
import buttonStyles from '../styles/button';
import Button from "./Button";
import connect from "react-redux/es/connect/connect";
import {deleteEvent, generateSchedule, resetSchedule, saveEvent} from "../actions/events";

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
        ...this.props.event,
        hasChanged: false,
        showDatePicker: false,
        datePickerTarget: null,
        datePickerInitialValue: new Date(),
        datePickerMinimumDate: new Date(),
    };

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
        this.props.saveEvent(this.state);
        this.props.navigation.goBack();
    };
    handleDeletePress = () => {
        this.props.deleteEvent(this.state.id);
        this.props.navigation.goBack();
    };
    handleCancelPress = () => this.props.navigation.goBack();
    handleGenerateSchedulePress = () => {
        this.props.generateSchedule(this.props.event);
        this.props.navigation.goBack();
    };
    handleResetSchedulePress = () => {
        this.props.resetSchedule(this.props.event);
        this.props.navigation.goBack();
    };

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
                {this.state.id &&
                <Button onPress={this.handleDeletePress}
                        style={this.state.id ? styles.deleteButton : styles.cancelButton}
                        text={this.state.id ? 'Delete' : 'Cancel'}
                />}
                {this.state.schedule
                    ? <Button onPress={this.handleResetSchedulePress} style={styles.deleteButton}
                              text="Reset schedule" />
                    : <Button onPress={this.handleGenerateSchedulePress} style={styles.createButton}
                              text="Generate schedule"/>
                }
            </View>

        );
    }
}

const mapStateToProps = (state, {navigation}) => {
    return {
        event: navigation.state.params,
        navigation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveEvent: (event) => {
            dispatch(saveEvent(event));
        },
        deleteEvent: (eventId) => {
            dispatch(deleteEvent(eventId));
        },
        generateSchedule: (event) => {
            dispatch(generateSchedule(event));
        },
        resetSchedule: (event) => {
            dispatch(resetSchedule(event));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EventForm);