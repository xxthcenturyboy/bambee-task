import { Task } from 'client/Task/types';
import { PaginationDefaults, SortDirection, PaginationResponse } from './pagination';

export enum TaskStatus {
  INCOMPLETE = 'Incomplete',
  COMPLETE = 'Complete'
}

export const TaskPaginatonDefaults: PaginationDefaults = {
  limit: 10,
  offset: 0,
  sortField: 'dueDate',
  sortDir: SortDirection.ASC
};

export interface TaskListResponse extends PaginationResponse {
  rows: Task[];
}
