import { getType, ActionType } from 'typesafe-actions';
import actions from './actions';
import { SettingsState } from 'shared/types/preload.interface';

export type Action = ActionType<typeof actions>;
export type State = {
  settings: SettingsState;
  windowWidth: number;
  windowHeight: number;
  csrfToken: string | null;
  esId: string | null;
  resetToken: string | null;
};

export const initialState: State = {
  settings: {
    RECAPTCHA_SITE_KEY: '',
  },
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  csrfToken: null,
  esId: null,
  resetToken: null,
};

const appReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {

    case getType(actions.setCurrentWindowSize):
      return {
        ...state,
        windowWidth: window && window.innerWidth,
        windowHeight: window && window.innerHeight
      };

    default: return state;
  }
};

export default appReducer;
