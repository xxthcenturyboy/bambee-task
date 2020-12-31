import { createSelector } from 'reselect';
import get from 'lodash/get';

const getPathname = state => get(state, 'router.location.pathname', '');

const hideHeaderPathnames = [
  '/login'
];

export const selectIsHeaderVisible = createSelector(
  [getPathname],
  pathname => hideHeaderPathnames.indexOf(pathname) === -1
);
