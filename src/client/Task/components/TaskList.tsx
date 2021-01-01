import React from 'react';
import { RootState, RootAction } from 'client/index';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as Types from 'client/Task/types';
import fetchTasks from 'client/Task/actions/fetchList';
import fetchComplete from 'client/Task/actions/fetchComplete';
import fetchDelete from 'client/Task/actions/fetchDelete';
import setTask from 'client/Task/actions/setTask';
import { Container, Section } from 'client/UI/components/Layout';
import { NoData } from './NoData';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.taskList.tasks);
  const isFetchingTasks = useSelector((state: RootState) => state.taskList.isFetchingTasks);
  const fetchingTasksError = useSelector((state: RootState) => state.taskList.fetchingTasksError);
  const sortField = useSelector((state: RootState) => state.taskList.sortField);
  const sortDir = useSelector((state: RootState) => state.taskList.sortDir);
  const offset = useSelector((state: RootState) => state.taskList.offset);
  const limit = useSelector((state: RootState) => state.taskList.limit);
  const statusFilter = useSelector((state: RootState) => state.taskList.statusFilter);
  const filterText = useSelector((state: RootState) => state.taskList.filterText);

  const dispatch = useDispatch();

  const [hasTasks, setHasTasks] = React.useState(false);

  React.useEffect(() => {
    if (!tasks.length && !isFetchingTasks) {
      loadTasks();
    }
  }, []);

  React.useEffect(() => {
    setHasTasks(tasks.length === 0);
  }, [tasks]);

  const loadTasks = async (): Promise<void> => {
    await dispatch(fetchTasks(statusFilter, sortField, sortDir, offset, limit));
  };

  const completeTask = async (taskId: string): Promise<void> => {
    await dispatch(fetchComplete(taskId));
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    await dispatch(fetchDelete(taskId));
  };

  const editTask = (task: Types.Task): void => {
    dispatch(setTask(task));
    dispatch(push(`/task/${task.id}`));
  };

  const createTask = (): void => {
    dispatch(setTask(null));
    dispatch(push('/task'));
  };

  if (!hasTasks) {
    return <NoData />;
  }

  return (
    <Container>
      <Section>
        Tasks
        <button type="button" onClick={createTask}>Create Task</button>
      </Section>
    </Container>
  );
};

export default TaskList;
