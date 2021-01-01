import { getType, ActionType } from 'typesafe-actions';
import { LocationChangeAction } from 'connected-react-router';
import actions from './actions';
import { TasksState, Task } from './types';
import { TaskStatus, TaskPaginatonDefaults } from 'shared/types/tasks';

export type Action = ActionType<typeof actions>;
export { TasksState };

export const initialState: TasksState = {
  tasks: [],
  isFetchingTasks: false,
  fetchingTasksError: '',
  sortField: TaskPaginatonDefaults.sortField,
  sortDir: TaskPaginatonDefaults.sortDir,
  offset: TaskPaginatonDefaults.offset,
  limit: TaskPaginatonDefaults.limit,
  statusFilter: TaskStatus.INCOMPLETE,
  filterText: ''
};

const reducer = (state: TasksState = initialState, action: Action | LocationChangeAction): TasksState => {
  switch (action.type) {

    case getType(actions.requestList.request): return {
      ...state,
      isFetchingTasks: true,
      fetchingTasksError: '',
    };

    case getType(actions.requestList.success): return {
      ...state,
      tasks: action.payload,
      isFetchingTasks: false,
      fetchingTasksError: '',
    };

    case getType(actions.requestList.failure): return {
      ...state,
      isFetchingTasks: false,
      fetchingTasksError: action.payload,
    };

    case getType(actions.requestComplete.request): return {
      ...state,
      isFetchingTasks: true,
      fetchingTasksError: '',
    };

    case getType(actions.requestComplete.success): {
      let nextTasks = state.tasks;

      if (action.payload) {
        nextTasks = state.tasks.filter((t) => {
          return t.id !== action.payload.id;
        });
      }

      return {
        ...state,
        tasks: nextTasks,
        isFetchingTasks: true,
        fetchingTasksError: '',
      };
    };

    case getType(actions.requestComplete.failure): return {
      ...state,
      isFetchingTasks: true,
      fetchingTasksError: action.payload,
    };

    case getType(actions.requestDelete.request): return {
      ...state,
      isFetchingTasks: true,
      fetchingTasksError: '',
    };

    case getType(actions.requestDelete.success): {
      let nextTasks = state.tasks;

      if (action.payload) {
        nextTasks = state.tasks.filter((t) => {
          return t.id !== action.payload.id;
        });
      }

      return {
        ...state,
        tasks: nextTasks,
        isFetchingTasks: true,
        fetchingTasksError: '',
      };
    };

    case getType(actions.requestDelete.failure): return {
      ...state,
      isFetchingTasks: true,
      fetchingTasksError: action.payload,
    };

    default: return state;
  }
};

export default reducer;
