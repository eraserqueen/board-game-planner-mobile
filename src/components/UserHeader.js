import React, {Component} from 'react';
import {Text, View} from "react-native";
import Button from "./Button";
import {logout} from "../actions/auth";
import connect from "react-redux/es/connect/connect";
import styles from '../styles/button';

class UserHeader extends Component{
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, flex:3}}>Hi {this.props.username}!</Text>
                <Button onPress={this.props.onLogout}
                        text="Logout"
                        style={[styles.cancelButton, {flex:1, height: 'auto'}]}
                        textStyle={{fontSize: 15}}
                />
            </View>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);