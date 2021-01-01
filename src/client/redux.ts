import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, RouterState, routerMiddleware } from 'connected-react-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import appReducer, { State as AppState, initialState as initialAppState } from 'client/App/reducers';
import { State as AuthState } from 'client/Auth';
import { State as UserState } from 'client/User';
import {
  TasksState as TaskListState,
  EditTaskState as TaskEditState
 } from 'client/Task';
import merge from 'lodash/merge';
import {
  useSelector as reduxUseSelector,
  TypedUseSelectorHook,
  useDispatch as reduxUseDispatch
} from 'react-redux';

// reducers
import authReducer, { initialState as initialAuthState } from 'client/Auth/reducers';
import userReducer, { initialState as initialUserState } from 'client/User/reducers';
import taskListReducer, { initialState as initialTaskListState } from 'client/Task/listReducers';
import taskEditReducer, { initialState as initialTaskEditState } from 'client/Task/editReducers';
import clientReducer from 'client/reducers';

import { history } from './history';
export { RootAction } from './actions';

// Support redux devtools extension
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
  || compose;

interface StoreEnhancerState { }
export interface RootState extends StoreEnhancerState {
  app: AppState;
  auth: AuthState;
  form: any;
  router: RouterState;
  taskList: TaskListState,
  taskEdit: TaskEditState,
  user: UserState;
  client: any;
}

export const reducers = {
  app: appReducer,
  auth: authReducer,
  form: formReducer,
  router: connectRouter(history),
  taskList: taskListReducer,
  taskEdit: taskEditReducer,
  user: userReducer,
  client: clientReducer,
};

// Root redux reducer
const reducer = combineReducers<RootState>(reducers);

const initialState = {
  app: initialAppState,
  auth: initialAuthState,
  taskList: initialTaskListState,
  taskEdit: initialTaskEditState,
  user: initialUserState,
};
const mergedInitialState = merge(
  initialState,
  (window as any).__PRELOADED_STATE__ || {}
);
const middlewares = applyMiddleware(
  routerMiddleware(history),
  thunk,
);
const enhancer = composeEnhancer(middlewares);
export const store = createStore(reducer, mergedInitialState, enhancer);

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
type RootAction = import('./actions').RootAction;
export type ReduxDispatch = ThunkDispatch<RootState, any, RootAction>;
export const useDispatch = () => reduxUseDispatch<ReduxDispatch>();
