import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
import Users from './DemoPages/Users';
import configureStore from './config/configureStore';
import store from './config/store'
import { Provider } from 'react-redux';


const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

renderApp(Users);
if (module.hot) {
  module.hot.accept('./DemoPages/Users', () => {
    const NextApp = require('./DemoPages/Users').default;
    renderApp(NextApp);
  });
}
unregister();

registerServiceWorker();

