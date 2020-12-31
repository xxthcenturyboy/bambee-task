import { Dispatch } from 'redux';
import { RootState } from 'client/index';
import { store } from 'client/redux';
import loginState from './lib/login-state';
import preloadState from './lib/preload-state';

export {
  appBootstrap,
  loginBootstrap,
};

////////////////////

type State = {
  state: RootState;
  dispatch: Dispatch;
};

function _getState(): State {
  const state: RootState = store.getState();
  const dispatch = store.dispatch;
  return {
    state,
    dispatch
  };
}

function appBootstrap() {
  const { state, dispatch } = _getState();
  preloadState(state, dispatch);
}

function loginBootstrap() {
  const { state, dispatch } = _getState();
  loginState(state, dispatch);
}
