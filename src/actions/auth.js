export const login = (username, password) => {
    console.log('actions/auth/login');
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};

export const logout = () => {
    console.log('actions/auth/logout');
    return {
        type: 'LOGOUT'
    };
};

export const signup = (username, password) => {
    return (dispatch) => {
    };
};
