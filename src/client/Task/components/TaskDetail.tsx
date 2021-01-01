import React from 'react';
import { RootState, RootAction } from 'client/index';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as Types from 'client/Task/types';
import fetchTask from 'client/Task/actions/fetchTask';
import fetchComplete from 'client/Task/actions/fetchComplete';
import fetchDelete from 'client/Task/actions/fetchDelete';
import fetchCreate from 'client/Task/actions/fetchCreate';
import fetchUpdate from 'client/Task/actions/fetchUpdate';
import { Container, Section } from 'client/UI/components/Layout';
import { NoData } from './NoData';

const TaskDetail: React.FC = () => {
  const task = useSelector((state: RootState) => state.taskEdit.task);
  const isFetchingTask = useSelector((state: RootState) => state.taskEdit.isFetchingTask);
  const fetchingTaskError = useSelector((state: RootState) => state.taskEdit.fetchTaskError);
  const isEditing = useSelector((state: RootState) => state.taskEdit.isEditing);
  const location = useSelector((state: RootState) => state.router.location);

  const dispatch = useDispatch();

  console.log(location);

  React.useEffect(() => {
    if (!task && !isFetchingTask) {
      loadTask();
    }
  }, []);

  const loadTask = async (): Promise<void> => {
    await dispatch(fetchTask(''));
  };

  const completeTask = async (taskId: string): Promise<void> => {
    await dispatch(fetchComplete(taskId));
    dispatch(push('/tasks'));
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    await dispatch(fetchDelete(taskId));
    dispatch(push('/tasks'));
  };

  const createTask = (): void => {
    if (!task) { return; }
    dispatch(fetchCreate(task.name, task.description, task.dueDate));
    dispatch(push(`/tasks`));
  };

  const updateTask = (): void => {
    if (!(task && task.id)) { return; }
    dispatch(fetchUpdate(task.id, task.name, task.description, task.dueDate));
  };

  return (
    <Container>
      <Section>
        Tasks
      </Section>
    </Container>
  );
};

export default TaskDetail;
