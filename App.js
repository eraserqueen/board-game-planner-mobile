import React, {Component} from 'react';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "./src/store";
import AuthWrapper from "./src/AuthWrapper";

class App extends Component {
    componentDidMount(){
        console.ignoredYellowBox = ['Warning: isMounted(...)', 'Remote debugger is in a background tab', '(ADVICE)'];
    }
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthWrapper />
                </PersistGate>
            </Provider>
        );
    }
}
export default App;