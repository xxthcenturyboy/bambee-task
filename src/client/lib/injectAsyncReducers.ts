// Use this to inject a reducer after render
import { combineReducers } from 'redux';

const injectAsyncReducers = async (store, reducers, asyncReducers) => {
  const combine = {};
  for (const reducer in asyncReducers) {
    // resolve the promise from the dynamic import and save the default export
    const module = await asyncReducers[reducer];
    // the reducer will be the default export on the module
    combine[reducer] = await module.default;
  }
  const newReducer = combineReducers({ ...reducers, ...combine });
  store.replaceReducer(newReducer);
};

export default injectAsyncReducers;
