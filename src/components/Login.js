import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { login } from '../actions/auth';
import Button from './Button';
import styles from '../styles/button';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    userLogin (e) {
        this.props.onLogin(this.state.username, this.state.password);
        e.preventDefault();
    }

    render () {
        return (
            <ScrollView style={{padding: 20, marginTop:40}}>
                <TextInput
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.userLogin(e)} text="Login" style={styles.createButton}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);