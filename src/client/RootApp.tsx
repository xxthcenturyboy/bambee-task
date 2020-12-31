import { Provider } from 'react-redux';
import { history } from './history';
import { store } from './redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import React from 'react';
import App from 'client/App/components/App';

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App} />
    </ConnectedRouter>
  </Provider>
);
