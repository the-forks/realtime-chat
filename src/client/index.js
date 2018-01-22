import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { App } from 'containers/App';
import { AppContainer } from 'react-hot-loader';

import 'normalize-css';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('containers/App', () => {
        render(App)
    })
}