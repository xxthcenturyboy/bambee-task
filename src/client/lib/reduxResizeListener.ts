/**
 * Listens to the window resize event and dispatches an action to the store that
 * stores the window size on the main `app` state.
 */
import setCurrentWindowSize from 'client/App/actions/setCurrentWindowSize';

export default function reduxResizeListener(store) {
  store.dispatch(setCurrentWindowSize());
  window.addEventListener('resize', () => {
    store.dispatch(setCurrentWindowSize());
  });
}
