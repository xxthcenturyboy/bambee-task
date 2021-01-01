import { getType, ActionType } from 'typesafe-actions';
import { LocationChangeAction } from 'connected-react-router';
import actions from './actions';
import { EditTaskState, Task } from './types';

export type Action = ActionType<typeof actions>;
export { EditTaskState };

export const initialState: EditTaskState = {
  task: { name: '', description: '', dueDate: '' },
  isFetchingTask: false,
  fetchTaskError: '',
  isEditing: false
};

const reducer = (state: EditTaskState = initialState, action: Action | LocationChangeAction): EditTaskState => {
  switch (action.type) {

    case getType(actions.requestTask.request): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestTask.success): return {
      ...state,
      task: action.payload,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestTask.failure): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: action.payload,
    };

    case getType(actions.setTask): return {
      ...state,
      task: action.payload,
      isEditing: action.payload.id ? true : false,
    };

    case getType(actions.setName): return {
      ...state,
      task: {
        ...state.task,
        name: action.payload
      }
    };

    case getType(actions.setDescription): return {
      ...state,
      task: {
        ...state.task,
        description: action.payload
      }
    };

    case getType(actions.setDateDue): return {
      ...state,
      task: {
        ...state.task,
        dueDate: action.payload
      }
    };

    case getType(actions.requestComplete.request): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestComplete.success): return {
      ...state,
      task: action.payload,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestComplete.failure): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: action.payload,
    };

    case getType(actions.requestCreate.request): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestCreate.success): return {
      ...state,
      task: action.payload,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestCreate.failure): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: action.payload,
    };

    case getType(actions.requestUpdate.request): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestUpdate.success): return {
      ...state,
      task: action.payload,
      isFetchingTask: true,
      fetchTaskError: '',
    };

    case getType(actions.requestUpdate.failure): return {
      ...state,
      isFetchingTask: true,
      fetchTaskError: action.payload,
    };

    default: return state;
  }
};

export default reducer;
