import { RouterAction, LocationChangeAction } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';

import * as appActions from 'client/App/actions';
import * as authActions from 'client/Auth/actions';
import * as userActions from 'client/User/actions';
import * as taskActions from 'client/Task/actions';

const allActions = {
  ...appActions,
  ...authActions,
  ...userActions,
  ...taskActions,
};

type AppAction = ActionType<typeof allActions>;
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
