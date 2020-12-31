import { ActionType } from 'typesafe-actions';

export type Action = ActionType<any>;
export type State = {
  name: string;
  logoURL: string;
  redirectURI: string;
};

const initialState: State = {
  name: '',
  logoURL: '',
  redirectURI: '',
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    default: return state;
  }
};

export default reducer;
