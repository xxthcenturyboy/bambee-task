import { TaskStatus } from 'shared/types/tasks';
import { SortDirection } from 'shared/types/pagination';

export type Task = {
  id?: string;
  name?: string;
  description?: string;
  dueDate?: Date;
  createdAt?: Date;
  status?: TaskStatus;
};

export type TasksState = {
  tasks: Task[];
  isFetchingTasks: boolean;
  fetchingTasksError: string;
  sortField: string;
  sortDir: SortDirection;
  statusFilter: TaskStatus | 'All';
  filterText: string;
};

export type EditTaskState = {
  task: Task | null;
  isFetchingTask: boolean;
  fetchTaskError: string;
  isEditing: boolean;
};
