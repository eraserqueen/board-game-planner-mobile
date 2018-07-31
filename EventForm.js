import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDateTime } from './dateUtils';
import { saveEvent, deleteEvent } from './api';

const styles = StyleSheet.create({
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
    button: {
        height: 50,
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    createButton: {
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        borderColor: '#ccc',
    },
    deleteButton: {
        backgroundColor: '#cc3333',
        borderColor: '#cc3333',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    },
    borderTop: {
        borderColor: '#eefeff',
        borderTopWidth: 0.5
    }
});

class EventForm extends Component {
    state = {
        showDatePicker: false,
        dateTimeStart: '',
        dateTimeEnd: '',
        datePickerTarget: '',
        datePickerInitialValue: new Date()
    }
    componentDidMount() {
        console.log(this.props.navigation.state);
        if (this.props.navigation.state.routeName == 'editForm') {
            this.setState(this.props.navigation.state.params);
        }
    }
    
    handleDatePress = (datePickerTarget) => {
        let datePickerInitialValue = new Date();
        if (this.state[datePickerTarget] != '') {
            datePickerInitialValue = new Date(this.state[datePickerTarget]);
        }
        console.log('init date to ', datePickerInitialValue);
        this.setState({
            showDatePicker: true,
            datePickerTarget,
            datePickerInitialValue
        });
    }
    handleDatePicked = (value) => {
        const newState = {
            showDatePicker: false,
            datePickerTarget: '',
            datePickerInitialValue: new Date()
        };
        newState[this.state.datePickerTarget] = new Date(value);
        this.setState(newState);
    }
    handleDatePickerHide = () => {
        this.setState({ showDatePicker: false, datePickerTarget: '' });
    }
    handleAddPress = () => {
        saveEvent(this.state).then(res =>
            this.props.navigation.goBack()
        );
    }
    handleDeletePress = () => {
        deleteEvent(this.state.id).then(res =>
            this.props.navigation.goBack()
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
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
                    />
                </View>
                <TouchableHighlight onPress={this.handleAddPress} style={[styles.button, styles.createButton]}>
                    <Text style={styles.buttonText}>{this.state.id ? 'Update' : 'Add'}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleDeletePress} style={[styles.button, this.state.id ? styles.deleteButton : styles.cancelButton]}>
                    <Text style={styles.buttonText}>{this.state.id ? 'Delete' : 'Cancel'}</Text>
                </TouchableHighlight>
            </View>

        );
    }
}

export default EventForm;