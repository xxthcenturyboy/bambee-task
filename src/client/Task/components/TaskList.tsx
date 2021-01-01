import React from 'react';
import { RootState, RootAction } from 'client/index';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as Types from 'client/Task/types';
import fetchTasks from 'client/Task/actions/fetchList';
import fetchComplete from 'client/Task/actions/fetchComplete';
import fetchDelete from 'client/Task/actions/fetchDelete';
import setTask from 'client/Task/actions/setTask';
import setTaskStatus from 'client/Task/actions/setTaskStatus';
import { TaskStatus } from 'shared/types/tasks';
import { Container } from 'client/UI/components/Layout';
import { NoData } from './NoData';
import * as UI from './UI';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.taskList.tasks);
  const totalTaskCount = useSelector((state: RootState) => state.taskList.totalTaskCount);
  const isFetchingTasks = useSelector((state: RootState) => state.taskList.isFetchingTasks);
  const fetchingTasksError = useSelector((state: RootState) => state.taskList.fetchingTasksError);
  const sortField = useSelector((state: RootState) => state.taskList.sortField);
  const sortDir = useSelector((state: RootState) => state.taskList.sortDir);
  const offset = useSelector((state: RootState) => state.taskList.offset);
  const limit = useSelector((state: RootState) => state.taskList.limit);
  const statusFilter = useSelector((state: RootState) => state.taskList.statusFilter);
  const filterText = useSelector((state: RootState) => state.taskList.filterText);

  const dispatch = useDispatch();

  const [title, setTitle] = React.useState('Tasks');
  const [hasTasks, setHasTasks] = React.useState(false);

  React.useEffect(() => {
    if (!isFetchingTasks) {
      loadTasks();
    }
  }, []);

  React.useEffect(() => {
    setHasTasks(tasks.length > 0);
    // tslint:disable-next-line:prefer-template
    setTitle(`Tasks ${'(' + totalTaskCount + ')' || ''}`);
  }, [tasks]);

  React.useEffect(() => {
    loadTasks();
  }, [statusFilter]);

  const loadTasks = async (): Promise<void> => {
    await dispatch(fetchTasks(statusFilter, sortField, sortDir, offset, limit));
  };

  const selectStatusFilter = (newStatus: TaskStatus): void => {
    // const newStatus = statusFilter === TaskStatus.INCOMPLETE ? TaskStatus.COMPLETE : TaskStatus.INCOMPLETE;
    dispatch(setTaskStatus(newStatus));
  };

  const editTask = (task: Types.Task): void => {
    dispatch(setTask(task));
    dispatch(push(`/task/${task.id}`));
  };

  const createTask = (): void => {
    dispatch(setTask({ name: '', description: '', dueDate: '' }));
    dispatch(push('/task'));
  };

  return (
    <Container>
      <UI.Title>{title}</UI.Title>
      <UI.FilterWrapper>
        <FormControl component="fieldset">
          <FormLabel component="legend" style={{ textAlign: 'center' }}>Status</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value={TaskStatus.INCOMPLETE}
              control={<Radio color="primary" />}
              label="New"
              labelPlacement="top"
              onClick={() => selectStatusFilter(TaskStatus.INCOMPLETE)}
            />
            <FormControlLabel
              value={TaskStatus.COMPLETE}
              control={<Radio color="primary" />}
              label="Complete"
              labelPlacement="top"
              onClick={() => selectStatusFilter(TaskStatus.COMPLETE)}
            />
          </RadioGroup>
        </FormControl>
      </UI.FilterWrapper>
      <UI.ControlWrapper>
        <UI.Btn
          variant="primary"
          disabled={false}
          onClick={createTask}
        >
          New Task
        </UI.Btn>
      </UI.ControlWrapper>
      {!hasTasks && !isFetchingTasks && <NoData />}
      {hasTasks && tasks.map((task) => {
        return (
          <UI.Section
            key={task.id}
            onClick={() => editTask(task)}
          >
            <UI.ItemTitle>{task.name}</UI.ItemTitle>
            <UI.ItemDueDate>{new Date(task.dueDate || '').toDateString()}</UI.ItemDueDate>
            <UI.ItemDescription>{task.description}</UI.ItemDescription>
          </UI.Section>
        );
      })
      }
    </Container>
  );
};

export default TaskList;
