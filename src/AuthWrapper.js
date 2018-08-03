import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from "./components/Login";
import Nav from "./Nav";

class AuthWrapper extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return <Login/>;
        }
        return <Nav />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default connect(mapStateToProps)(AuthWrapper);
