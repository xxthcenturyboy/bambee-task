import { TaskStatus } from 'shared/types/tasks';
import { SortDirection } from 'shared/types/pagination';

export type Task = {
  id?: string;
  name: string;
  description: string;
  dueDate: string;
  createdAt?: string;
  status?: TaskStatus;
};

export type TasksState = {
  tasks: Task[];
  totalTaskCount: number;
  isFetchingTasks: boolean;
  fetchingTasksError: string;
  sortField: string;
  sortDir: SortDirection;
  offset: number;
  limit: number;
  statusFilter: TaskStatus;
  filterText: string;
};

export type EditTaskState = {
  task: Task;
  isFetchingTask: boolean;
  fetchTaskError: string;
  isEditing: boolean;
};
