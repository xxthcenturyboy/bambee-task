import { getType, ActionType } from 'typesafe-actions';
import { LocationChangeAction } from 'connected-react-router';
import actions from './actions';
import { State } from './types';

export type Action = ActionType<typeof actions>;
export { State };

export const initialState: State = {
  profile: null,
  isFetchingProfile: false,
  fetchProfileError: '',
  didInvalidateProfile: false,
};

const reducer = (state: State = initialState, action: Action | LocationChangeAction): State => {
  switch (action.type) {

    case getType(actions.requestProfile.request): return {
      ...state,
      isFetchingProfile: true,
      fetchProfileError: '',
    };

    case getType(actions.requestProfile.success): return {
      ...state,
      profile: action.payload,
      isFetchingProfile: false,
      fetchProfileError: '',
      didInvalidateProfile: false
    };

    case getType(actions.requestProfile.failure): return {
      ...state,
      isFetchingProfile: false,
      fetchProfileError: action.payload,
    };

    case getType(actions.setProfile): return {
      ...state,
      didInvalidateProfile: false,
      profile: action.payload
    };

    case getType(actions.invalidateProfile): return {
      ...state,
      didInvalidateProfile: true
    };

    default: return state;
  }
};

export default reducer;
