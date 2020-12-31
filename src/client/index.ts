import 'babel-polyfill';
require('isomorphic-fetch');
require('regenerator-runtime/runtime');
import * as ReactDOM from 'react-dom';
import bindReduxResizeListener from 'client/lib/reduxResizeListener';
import RootApp from './RootApp';
import { store } from './redux';
export * from './redux';
export * from './history';

(window as any).store = store;

const rootElement = document.getElementById('app');

ReactDOM.render(RootApp, rootElement, onRendered);

// Anything that is lower priority than getting the app rendered should go here.
function onRendered() {
  bindReduxResizeListener(store);
}

export { };
