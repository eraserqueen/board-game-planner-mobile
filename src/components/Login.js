import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {checkCredentials, registerNewUser} from '../actions/auth';
import Button from './Button';
import buttonStyles from '../styles/button';
import formStyles from '../styles/form';

class Login extends Component {
    state = {
        screen: 'login',
        username: '',
        password: ''
    };

    handleLoginPress(e) {
        this.props.onLogin(this.state);
        e.preventDefault();
    }
    handleRegisterPress(e) {
        this.props.onRegister(this.state);
        e.preventDefault();
    }
    handleToggleScreen() {
        this.setState({screen: this.state.screen === 'login' ? 'register' : 'login'});
    }

    render() {
        return (
            <ScrollView style={{padding: 20, marginTop: 40}}>
                <TextInput
                    style={formStyles.textInput}
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}/>
                <TextInput
                    style={formStyles.textInput}
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}/>
                <View style={{margin: 7}}>
                    {this.props.error && <Text style={{color: 'red'}}>{this.props.error}</Text>}
                </View>
                {this.state.screen === 'login'
                    ? <Button onPress={(e) => this.handleLoginPress(e)} text="Login" style={buttonStyles.createButton}/>
                    : <Button onPress={(e) => this.handleRegisterPress(e)} text="Register"
                              style={buttonStyles.createButton}/>
                }
                <Text style={{
                    margin: 30,
                    padding: 30,
                    color: '#ccc',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}>OR</Text>
                <Button onPress={() => this.handleToggleScreen()}
                        text={this.state.screen === 'login' ? "Register as a new user" : "Login as an existing user"}
                        style={buttonStyles.cancelButton}/>
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
        navigation: ownProps.navigation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: ({username, password}) => {
            dispatch(checkCredentials(username, password));
        },
        onRegister: ({username, password}) => {
            dispatch(registerNewUser(username, password));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);