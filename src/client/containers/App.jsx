import React, { Component } from 'react';
import { Chat } from 'components/Chat';
import { Provider } from 'react-redux';

import store from 'store';

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Chat />
            </Provider>
        )
    }
}
