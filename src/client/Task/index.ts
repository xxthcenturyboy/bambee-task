import * as Types from './types';
import actions from './actions';
import * as selectors from './selectors';
import listReducer, { TasksState, Action as ListAction } from './listReducers';
import editReducer, { EditTaskState, Action as EditAction } from './editReducers';

export { TasksState, EditTaskState, ListAction, EditAction, Types, selectors, actions };
export default { Types, actions, selectors, listReducer, editReducer };
